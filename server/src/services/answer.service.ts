import { EntityHelper } from "@/helper";
import Answer from "@/models/answer/answer";

import {
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/customErrorClass";
import { IAnswer, ISurvey, IUser } from "@shared/types";
import { SortOrder, Types } from "mongoose";

const entityHelper = new EntityHelper(Answer);

export class AnswerService {
  getAnswerById = async ({
    userId,
    answerId,
  }: {
    userId: string;
    answerId: string;
  }) => {
    const answer = await Answer.findById<
      IAnswer & { surveyId: ISurvey; respondentId: IUser }
    >(answerId)
      .populate([
        {
          path: "surveyId",
          model: "Survey",
          select: "-respondents authorizedViewers respondentId",
        },
        {
          path: "respondentId",
          model: "User",
          select: "username nickname avatar core",
        },
      ])
      .orFail(new NotFoundError("Answer not found.", "ANSWER_NOT_FOUND"));

    if (
      !answer.surveyId.authorId.equals(userId) &&
      !answer.respondentId.equals(userId) &&
      !answer.surveyId.authorizedViewers.some(
        (viewer: Types.ObjectId) => String(viewer) === String(userId)
      )
    ) {
      throw new UnauthorizedError(
        " You're not permitted to view this survey.",
        "UNAUTHORIZED_VIEW"
      );
    }

    return answer;
  };

  getAnswersOfUser = async ({
    userId,
    limit,
    page,
    sort,
    skip,
  }: {
    userId: string;
    limit: number;
    page: number;
    sort: SortOrder;
    skip: number;
  }) => {
    const filterQuery = { respondentId: userId };

    return await entityHelper.getListOfResource({
      filterQuery,
      limit,
      page,
      query: Answer.find(filterQuery)
        .sort({ createdAt: sort })
        .skip(skip)
        .limit(limit)
        .populate({
          path: "survey",
          model: "Survey",
          select: "-respondents",
        }),
    });
  };
}
