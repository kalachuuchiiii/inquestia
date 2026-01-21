import redis from "@/config/redis";
import { SURVEY_PROJECTION } from "@/constants";
import { EntityHelper } from "@/helper";
import Survey, { SurveyModel } from "@/models/survey/survey";
import User from "@/models/user/user";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/customErrorClass";
import { QueryParam } from "@shared/schemas";
import { SurveyDTO } from "@shared/types";
import mongoose from "mongoose";

const surveyHelper = new EntityHelper<SurveyModel>(Survey);
export class SurveyService {
  revokeAuthorization = async ({
    surveyId,
    userId,
    candidateUserId,
  }: {
    surveyId: string;
    userId: string;
    candidateUserId: string;
  }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      authorId: userId,
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const candidateUser = await User.findById(candidateUserId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    if (
      survey.authorizedViewers.every(
        (v) => String(v) !== String(candidateUserId)
      )
    ) {
      throw new BadRequestError(
        `${candidateUser.displayName} is not yet authorized.`,
        "NOT_YET_AUTHORIZED_AS_VIEWER"
      );
    }

    survey.authorizedViewers = survey.authorizedViewers.filter(
      (v) => String(v) !== String(candidateUserId)
    );
    return await survey.save();
  };

  authorizeUser = async ({
    surveyId,
    userId,
    candidateUserId,
  }: {
    surveyId: string;
    userId: string;
    candidateUserId: string;
  }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      authorId: userId,
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const candidateUser = await User.findById(candidateUserId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    if (
      survey.authorizedViewers.some(
        (v) => String(v) === String(candidateUserId)
      )
    ) {
      throw new ConflictError(
        `${candidateUser.displayName} is already authorized.`,
        "ALREADY_AUTHORIZED_AS_VIEWER"
      );
    }

    survey.authorizedViewers.push(candidateUser._id);
    return await survey.save();
  };

  findById = async (surveyId: string) => {
    const matchedSurvey = await Survey.findById(surveyId)
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
    userId,
    limit,
    page,
    skip,
  }: { userId: string } & Omit<QueryParam, "sort">) => {
    const user = await User.findById(userId).orFail(
      new UnauthorizedError("Invalid Session.", "INVALID_SESSION")
    ); //userid might have been tampered;

    const filterQuery = {
      hasReachedTargetRespondents: false,
      respondents: {
        $nin: [new mongoose.Types.ObjectId(userId)],
      },
      isTakendown: false,
      closed: false,
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

    const nextPage = surveyHelper.getNextPage({
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
