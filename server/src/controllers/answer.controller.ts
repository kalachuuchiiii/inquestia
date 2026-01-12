import { EntityHelper } from "@/helper";
import Answer from "@/models/answer/answer";
import { AnswerService } from "@/services";
import { QueryParamParser } from "@shared/schemas";
import { RequestHandler } from "express";
import z from "zod";

const answerService = new AnswerService();

export class ReportController {
  getAnswerById: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.userId);
    const answerId = z.string().parse(req.params.answerId);
    const answer = await answerService.getAnswerById({ userId, answerId });

    return res.status(200).json({
      success: true,
      answer,
    });
  };

  getAnswersOfUser: RequestHandler = async (req, res) => {
    const userId = z.string().parse(req.userId);
    const { limit, page, sort, skip } = QueryParamParser.parse(req.query);

    const {
      nextPage,
      resourceList: answers,
      totalResource: totalAnswers,
    } = await answerService.getAnswersOfUser({
      limit,
      userId,
      page,
      sort,
      skip,
    });

    return res.status(200).json({
      success: true,
      nextPage,
      answers,
      totalAnswers,
    });
  };
}
