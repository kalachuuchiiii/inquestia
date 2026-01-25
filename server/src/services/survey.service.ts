import redis from "@/config/redis";
import { SURVEY_PROJECTION } from "@/constants";
import { EntityHelper } from "@/helper";
import Survey, { SurveyModel } from "@/models/survey/survey";
import User from "@/models/user/user";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import { runWithSession } from "@/utils/runWithSession";
import { QueryParam } from "@shared/schemas";
import { SurveyDTO, SurveyForm } from "@shared/types";
import mongoose from "mongoose";

const surveyHelper = new EntityHelper<SurveyModel>(Survey);
type SurveyAndAuthId = { surveyId: string; myId: string };

export class SurveyService {
  upsertSurvey = async ({
    survey,
    myId,
  }: {
    survey: SurveyForm;
    myId: string;
  }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    const surveyId = survey._id;
    if (!surveyId) {
      return await runWithSession(async (session) => {
        const newSurvey = await new Survey({ ...survey, authorId: myId }).save({
          session,
        });
        if (user.core) {
          user.core.current += 100;
          user.core.highest = Math.max(user.core.current, user.core.highest);
          await user.save({ session });
        }
        return newSurvey;
      });
    }

    const existingSurvey = await Survey.findByIdAndUpdate(
      { _id: survey._id, authorId: myId },
      { ...survey, isDraft: false }
    ).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    return existingSurvey;
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

    return safeSurvey;
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
      respondents: {
        $nin: [new mongoose.Types.ObjectId(myId)],
      },
      isTakendown: false,
      isClosed: false,
      isDraft: false,
    };

    const seenSurveyIdKey = `survey:seen:${user._id}`;

    if (page === 1) {
      await redis.del(seenSurveyIdKey);
    }

    let alreadySeenIds: string[];

    if (page > 1) {
      alreadySeenIds = await redis.sMembers(seenSurveyIdKey);
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
      await redis.sAdd(seenSurveyIdKey, surveyIds);
    }

    return {
      nextPage,
      surveys,
      totalSurveys,
    };
  };
}
