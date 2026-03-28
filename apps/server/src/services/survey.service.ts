import { SURVEY_PROJECTION } from "@/constants";
import { EntityHelper } from "@/helper";
import { updateUserStreakIfNeeded } from "@/helper/user.helper";
import Survey, { SurveyModel } from "@/models/survey/survey";
import User from "@/models/user/user";
import { ObjectIdSchema } from "@/schemas";
import { seenSurveyStore } from "@/store/SeenSurveyStore";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import { runWithSession } from "@/utils/runWithSession";
import { type QueryParam } from "@inquestia/schemas";
import {
  AnswerFormFields,
  SelectTypeQuestionFormFields,
  SurveyDTO,
  SurveyForm,
  TextTypeQuestionFormFields,
} from "@inquestia/types";
import type { ClientSession } from "mongoose";
import mongoose from "mongoose";

const surveyHelper = new EntityHelper<SurveyModel>(Survey);
type SurveyAndAuthId = { surveyId: string; myId: string };

type CreateSurveyProps = {
  survey: SurveyForm;
  myId: string;
};

export class SurveyService {
  compareBoost = (userBooster: number, surveyBooster: number) => {
    if (userBooster < surveyBooster) {
      throw new BadRequestError(
        "Insufficient booster points",
        "INSUFFICIENT_BOOSTER_POINT"
      );
    }
    return;
  };

  upsertSurveyDraft = async ({ survey, myId }: CreateSurveyProps) => {
    const { error: isSurveyNonExistent, data: surveyId } =
      ObjectIdSchema.safeParse(survey._id);

      const { _id, ...surveyValues } = survey;

      //defaults to booster: 0 if draft

      //create new draft

    if (isSurveyNonExistent) {
      const createdDraft = await new Survey({
        ...surveyValues,
        booster: 0,
        isDraft: true,
        authorId: myId,
      }).save();
      return createdDraft;
    }

    //update existing draft
    
    const draft = await Survey.findOneAndUpdate(
      { _id: surveyId, authorId: myId },
      { ...surveyValues, booster: 0, isDraft: true, authorId: myId }
    ).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    return draft;
  };

  upsertSurvey = async ({ survey, myId }: CreateSurveyProps) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    this.compareBoost(user.toObject().boosterPoint, survey.booster);
    const { _id, ...surveyValues } = survey;
    const { error: isSurveyNonExistent, data: surveyId } = ObjectIdSchema.safeParse(_id);

    const deductBoosterAndGiveCore = async(session: ClientSession) => {
       user.boosterPoint -= surveyValues.booster;
         if(user.core){
           user.core.current += 100;
          user.core.highest = Math.max(user.core.current, user.core.highest);
         }
         return await user.save({ session });
    }


    //publish new survey
    if(isSurveyNonExistent){
     return await runWithSession(async (session) => {
        const newSurvey = await new Survey({ ...surveyValues, authorId: myId, isDraft: false }).save({
          session,
        });
        await deductBoosterAndGiveCore(session);
        await updateUserStreakIfNeeded(user, session);
        return newSurvey;
      });
    }

    //publish existing survey(a draft);

    return await runWithSession(async(session) => {
      const publishedSurvey = await Survey.findOneAndUpdate(
      { _id: surveyId, authorId: myId, isDraft: true },
      { ...surveyValues, isDraft: false },
      { session }
    ).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
     await deductBoosterAndGiveCore(session);
      await updateUserStreakIfNeeded(user, session);
     return publishedSurvey;
    })
  };

  reOpenSurvey = async ({ surveyId, myId }: SurveyAndAuthId) => {
    const survey = await Survey.findById(surveyId).orFail(
      new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND")
    );
    if (String(survey.authorId) !== myId) {
      throw new UnauthorizedError(
        "You can't re-open someone's survey.",
        "UNAUTHORIZED_SURVEY_REOPENING"
      );
    }
    survey.isClosed = false;
    return await survey.save();
  };

  closeSurvey = async ({ surveyId, myId }: SurveyAndAuthId) => {
    const survey = await Survey.findById(surveyId).orFail(
      new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND")
    );
    if (String(survey.authorId) !== myId) {
      throw new UnauthorizedError(
        "You can't close someone's survey.",
        "UNAUTHORIZED_SURVEY_CLOSURE"
      );
    }
    survey.isClosed = true;
    return await survey.save();
  };

  softDelete = async ({ surveyId, myId }: SurveyAndAuthId) => {
    const survey = await Survey.findById(surveyId).orFail(
      new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND")
    );
    if (String(survey.authorId) !== myId) {
      throw new UnauthorizedError(
        "You can't soft delete someone's survey.",
        "UNAUTHORIZED_SOFT_DELETE"
      );
    }
    survey.isDeleted = true;
    return await survey.save();
  };

  revokeAuthorization = async ({
    surveyId,
    myId,
    userId,
  }: {
    surveyId: string;
    myId: string;
    userId: string;
  }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      authorId: myId,
      isDeleted: false,
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const candidateUser = await User.findById(userId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    if (survey.authorizedViewers.every((v) => String(v) !== String(userId))) {
      throw new BadRequestError(
        `${candidateUser.displayName} is not yet authorized.`,
        "NOT_YET_AUTHORIZED_AS_VIEWER"
      );
    }

    survey.authorizedViewers = survey.authorizedViewers.filter(
      (v) => String(v) !== String(userId)
    );
    return await survey.save();
  };

  authorizeUser = async ({
    surveyId,
    myId,
    userId,
  }: {
    surveyId: string;
    myId: string;
    userId: string;
  }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      authorId: myId,
      isDeleted: false,
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const candidateUser = await User.findById(userId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    if (survey.authorizedViewers.some((v) => String(v) === String(userId))) {
      throw new ConflictError(
        `${candidateUser.displayName} is already authorized.`,
        "ALREADY_AUTHORIZED_AS_VIEWER"
      );
    }

    survey.authorizedViewers.push(candidateUser._id);
    return await survey.save();
  };

  findById = async (surveyId: string) => {
    const matchedSurvey = await Survey.findOne({
      _id: surveyId,
      isDeleted: false,
    })
      .populate([
        { path: "authorId", model: "User" },
        { path: "authorizedViewers", model: "User" },
      ])
      .orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    const safeSurvey = {
      ...matchedSurvey.getSafeDetails(),
      authorizedViewers: matchedSurvey.authorizedViewers.map((v) =>
        new User(v).getSafeDetails()
      ),
    };

    const responses: AnswerFormFields["responses"] = safeSurvey.questions.map(
      (q) => {
        if (q.type === "text") {
          const { _id, type, question, isRequired } = q;
          const text: TextTypeQuestionFormFields = {
            type,
            question,
            isRequired,
            questionId: _id as string,
            answer: "",
          };
          return text;
        }

        const { _id, type, question, isRequired } = q;
        const select: SelectTypeQuestionFormFields = {
          type,
          question,
          isRequired,
          questionId: _id as string,
          numberOfAnswersAllowed: q.numberOfAnswersAllowed,
          choices: q.choices,
          answers: [] as string[],
        };
        return select;
      }
    );

    return {
      safeSurvey,
      responses,
    };
  };

  getSurveyList = async ({
    myId,
    limit,
    page,
  }: { myId: string } & Omit<QueryParam, "sort" | "skip">) => {
    const user = await User.findById(myId).orFail(
      new UnauthorizedError("Invalid Session.", "INVALID_SESSION")
    );

    const filterQuery = {
      hasReachedTargetRespondents: false,
      isDeleted: false,

      isTakendown: false,
      isClosed: false,
      isDraft: false,
    };

    const seenSurveyIdKey = `survey:seen:${user._id}`;

    if (page === 1) {
      seenSurveyStore.delete(seenSurveyIdKey);
    }

    let alreadySeenIds: string[];

    if (page > 1) {
      alreadySeenIds = seenSurveyStore.get(seenSurveyIdKey)?.seenIds ?? [];
    } else {
      alreadySeenIds = [];
    }

    const totalSurveys = await Survey.countDocuments(filterQuery);

    const matchedSurveys = await Survey.aggregate([
      {
        $match: {
          ...filterQuery,
          _id: {
            $nin: alreadySeenIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $addFields: {
          algoScore: {
            $add: [
              { $multiply: [{ $rand: {} }, { $add: ["$booster", 1] }] },
              {
                $multiply: [
                  {
                    $rand: {},
                  },
                  {
                    $size: {
                      $setIntersection: ["$tags", user.interests],
                    },
                  },
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          algoScore: -1,
        },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
    ]);

    const surveys: SurveyDTO[] = matchedSurveys.map((s) => ({
      ...new Survey(s).getSafeDetails(),
      author: new User(s.author).getSafeDetails(),
    }));

    const nextPage = getNextPage({
      page,
      limit,
      totalResources: totalSurveys,
    });

    if (surveys.length > 0) {
      const surveyIds = surveys.map((s) => s._id.toString());
      seenSurveyStore.set(seenSurveyIdKey, {
        createdAt: new Date(),
        seenIds: surveyIds,
      });
    }

    return {
      nextPage,
      surveys,
      totalSurveys,
    };
  };

  purchaseBoost = async ({
    myId,
    quantity,
  }: {
    myId: string;
    quantity: number;
  }) => {
    const BOOST_COST = 10000; // 1 boost = 10,000 points
    const totalCost = quantity * BOOST_COST;

    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    if (!user.core || user.core.current < totalCost) {
      throw new BadRequestError(
        `Insufficient points. You need ${totalCost} points but only have ${user.core?.current || 0}.`,
        "INSUFFICIENT_POINTS"
      );
    }

    user.boosterPoint = (user.boosterPoint || 0) + quantity;
    user.core.current -= totalCost;

    await user.save();

    return {
      boosterPoint: user.boosterPoint,
      currentPoints: user.core.current,
      message: `Successfully purchased ${quantity} booster${quantity !== 1 ? "s" : ""}.`,
    };
  };
}
