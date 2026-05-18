import {
  givePointsAndUpdateStreakIfEligible,
  updateUserStreakIfNeeded,
} from "@/helper/user.helper";
import Survey from "@/models/survey/survey";
import User from "@/models/user/user";
import { seenSurveyStore } from "@/store/SeenSurveyStore";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import { runWithSession } from "@/utils/runWithSession";
import { BOOST_COST } from "@inquestia/constants";
import {
  type AnswerForm,
  type CloseEndedAnswer,
  type OpenEndedAnswer,
  type QueryParam,
  type Response,
  type SurveyForm,
  SurveySchema,
} from "@inquestia/schemas";

import mongoose from "mongoose";

type SurveyAndAuthId = { surveyId: string; myId: string };

export class SurveyService {
  compareBoostAndThrowIfIneligible = (
    userBooster: number,
    surveyBooster: number
  ) => {
    if (userBooster < surveyBooster) {
      throw new BadRequestError(
        "Insufficient booster points",
        "INSUFFICIENT_BOOSTER_POINT"
      );
    }
    return;
  };

  saveSurvey = async ({
    form,
    surveyId,
    myId,
  }: {
    form: SurveyForm;
    surveyId: string;
    myId: string;
  }) => {
    const result = await runWithSession(async (session) => {
      const survey = await Survey.findOne({
        _id: surveyId,
        authorId: myId,
      }).orFail(new NotFoundError("Survey not found", "SURVEY_NOT_FOUND"));
      await survey.updateOne(form, { session });
      if (form.status === "published" && form.booster > 0) {
        const user = await User.findById(myId).orFail(
          new NotFoundError("User not found", "USER_NOT_FOUND")
        );
        this.compareBoostAndThrowIfIneligible(
          user.toObject().boosterPoint,
          form.booster
        );
        user.boosterPoint -= form.booster;
        const mutatedUser = givePointsAndUpdateStreakIfEligible(100, user);
        await mutatedUser.save({ session });
      }
      return "OK";
    });
    return result;
  };

  createSurvey = async ({ form, myId }: { form: SurveyForm; myId: string }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found", "USER_NOT_FOUND")
    );
    this.compareBoostAndThrowIfIneligible(
      user.toObject().boosterPoint,
      form.booster
    );
    const newSurvey = new Survey({ ...form, authorId: myId });
    if (form.status === "draft") {
      return await newSurvey.save();
    }

    return await runWithSession(async (session) => {
      const survey = await newSurvey.save({ session });
      user.boosterPoint -= form.booster;

      const mutatedUser = givePointsAndUpdateStreakIfEligible(100, user);
      return {
        survey,
        user: await mutatedUser.save({ session }),
      };
    });
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
        `${candidateUser.username} is not yet authorized.`,
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
        `${candidateUser.username} is already authorized.`,
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
      .orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"))
      .lean();
    const safeSurvey = SurveySchema.parse(matchedSurvey);

    const responses: Response[] = safeSurvey.questions.map((q) => {
      if (q.type === "open_ended") {
        const { _id, type, question, isRequired } = q;
        const openEndedResponseForm: OpenEndedAnswer = {
          type,
          question,
          isRequired,
          questionId: _id as string,
          answer: "",
        };
        return openEndedResponseForm;
      }

      const {
        _id,
        type,
        question,
        numberOfAnswersAllowed,
        isRequired,
        choices,
      } = q;
      const closeEndedResponseForm: CloseEndedAnswer = {
        type,
        question,
        isRequired,
        numberOfAnswersAllowed,
        choices,
        questionId: _id as string,
        answers: [] as string[],
      };
      return closeEndedResponseForm;
    });

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

    const surveys = await Survey.aggregate([
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
      {
        $addFields: {
          totalRespondents: {
            $size: {
              $ifNull: ["$respondents", []],
            },
          },
        },
      },
      {
        $project: {
          respondents: 0,
          __v: 0,
        },
      },
    ]);

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

  getDraft = async ({ surveyId, myId }: { surveyId: string; myId: string }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      authorId: myId,
      status: "draft",
    }).orFail(new NotFoundError("Draft not found", "DRAFT_NOT_FOUND"));
    return survey;
  };

  purchaseBoost = async ({
    myId,
    quantity,
  }: {
    myId: string;
    quantity: number;
  }) => {
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
