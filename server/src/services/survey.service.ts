import redis from "@/config/redis";
import { SURVEY_PROJECTION } from "@/constants";
import { EntityHelper } from "@/helper";
import Survey from "@/models/survey/survey";
import User from "@/models/user/user";
import { UnauthorizedError } from "@/utils/errors/customErrorClass";
import { UpdateCustomVerificationEmailTemplateCommand } from "@aws-sdk/client-sesv2";
import { QueryParam } from "@shared/schemas";
import { SurveyDoc, SurveyDTO } from "@shared/types";
import mongoose from "mongoose";

const surveyHelper = new EntityHelper(Survey);
export class SurveyService {
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

    const surveys = await Survey.aggregate<SurveyDTO>([
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
        $project: SURVEY_PROJECTION,
      },
    ]);
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
