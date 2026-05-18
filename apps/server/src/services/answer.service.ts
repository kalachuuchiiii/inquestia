import { EntityHelper } from "@/helper";
import { givePointsAndUpdateStreakIfEligible } from "@/helper/user.helper";

import Answer from "@/models/answer/answer";
import Survey from "@/models/survey/survey";
import User from "@/models/user/user";
import { BadRequestError, NotFoundError } from "@/utils/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import { runWithSession } from "@/utils/runWithSession";
import {
  AnswerFilterSchema,
  AnswerFormSchema,
  AnswerSchema,
  type QueryParam,
} from "@inquestia/schemas";
import mongoose, { HydratedDocument, Types } from "mongoose";
import z from "zod";

export class AnswerService {
  getSurveyAnswers = async ({
    myId,
    skip,
    limit,
    page,
    filterForm,
  }: { myId: string; filterForm: z.infer<typeof AnswerFilterSchema> } & Omit<
    QueryParam,
    "sort"
  >) => {
    const answers = await Answer.aggregate([
      {
        $match: {
          surveyId: new Types.ObjectId(filterForm.surveyId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "respondentId",
          foreignField: "_id",
          as: "respondentId",
        },
      },
      {
        $lookup: {
          from: "surveys",
          localField: "surveyId",
          foreignField: "_id",
          pipeline: [
            {
              $match: {
                $or: [
                  {
                    authorId: new Types.ObjectId(myId),
                  },
                  {
                    authorizedViewers: new Types.ObjectId(myId),
                  },
                ],
              },
            },
          ],
          as: "surveyId",
        },
      },
      {
        $unwind: "$respondentId",
      },
      {
        $unwind: "$surveyId",
      },
      {
        $skip: skip,
      },
      {
        $limit: limit + 1,
      },
    ]);

    const nextPage = answers.length > limit ? page + 1 : undefined;
    return {
      answers: answers,
      nextPage,
    };
  };

  getMyAnswers = async ({
    myId,
    skip,
    page,
    limit,
  }: { myId: string } & Omit<QueryParam, "sort">) => {
    const query = {
      respondentId: myId,
    };

    const [answers, totalAnswers] = await Promise.all([
      Answer.find(query)
        .skip(skip)
        .limit(limit)
        .populate(["respondentId", "surveyId"])
        .lean(),
      Answer.countDocuments(query), //client will provide the user for respondent field, no populate needed
    ]);

    const nextPage = getNextPage({ page, limit, totalResources: totalAnswers });
    return {
      answers,
      totalAnswers,
      nextPage,
    };
  };

  submitAnswer = async ({
    myId,
    surveyId,
    answerForm,
  }: {
    myId: string;
    surveyId: string;
    answerForm: z.infer<typeof AnswerFormSchema>;
  }) => {
    const survey = await Survey.findOne({
      _id: surveyId,
      isClosed: false,
      isDeleted: false,
      isTakendown: false,
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    if (survey.respondents.map((r) => r.toString()).includes(myId)) {
      throw new BadRequestError(
        "You have already submitted an answer to this survey.",
        "ANSWER_ALREADY_SUBMITTED"
      );
    }

    const [author, respondent] = await Promise.all([
      User.findById(survey.authorId).orFail(
        new NotFoundError("Author not found.", "AUTHOR_NOT_FOUND")
      ),
      User.findById(myId).orFail(
        new NotFoundError("User not found.", "USER_NOT_FOUND")
      ),
    ]);

    return await runWithSession(async (session) => {
      survey.respondents.push(new mongoose.Types.ObjectId(myId));

      // Increment points for author (survey creator)
      if (author.core) {
        author.core.current += 50;
        author.core.highest = Math.max(
          author.core.highest,
          author.core.current
        );
        await author.save({ session });
      }

      if (respondent.core) {
        const mutatedRespondent = givePointsAndUpdateStreakIfEligible(
          500,
          respondent
        );
        await mutatedRespondent.save({ session });
      }

      await survey.save({ session });

      await new Answer({
        ...answerForm,
        respondentId: myId,
        surveyId,
      }).save({ session });
    });
  };

  toggleIsAuthentic = async ({
    answerId,
    myId,
  }: {
    answerId: string;
    myId: string;
  }) => {
    const answer = await Answer.findById(answerId).orFail(
      new NotFoundError("Answer not found.", "ANSWER_NOT_FOUND")
    );
    await Survey.exists({
      _id: answer.surveyId,
      $or: [
        {
          authorId: myId,
        },
        {
          authorizedViewers: [myId],
        },
      ],
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));

    await answer.updateOne({ isAuthentic: !answer.isAuthentic });
    return !answer.isAuthentic;
  };
}
