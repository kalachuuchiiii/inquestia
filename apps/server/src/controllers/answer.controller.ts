import { ObjectIdSchema } from "@/schemas";
import { AnswerService } from "@/services";
import {
  AnswerFilterSchema,
  AnswerFormSchema,
  AnswerSchema,
  QueryParamParser,
} from "@inquestia/schemas";
import { RequestHandler } from "express";
import z from "zod";

const answerService = new AnswerService();

export class AnswerController {
  toggleAnswerAuthenticity: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const answerId = ObjectIdSchema.parse(req.params.answerId);
    const isAuthentic = await answerService.toggleIsAuthentic({
      myId,
      answerId,
    });
    return res.status(200).json({
      success: true,
      isAuthentic,
    });
  };

  getSurveyAnswers: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const { skip, limit, page } = QueryParamParser.parse(req.query);

    const filterForm = AnswerFilterSchema.parse({
      ...(JSON.parse(req.query.filter as string) as any),
      surveyId,
    });
    const { answers, nextPage } = await answerService.getSurveyAnswers({
      myId,
      skip,
      limit,
      page,
      filterForm,
    });

    const cleanAnswers = z.array(AnswerSchema).parse(answers);
    const response = {
      answers: cleanAnswers,
      totalAnswers: 400,
      nextPage: null,
      success: true,
    };

    return res.status(200).json(response);
  };

  getMyAnswers: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const { answers, totalAnswers, nextPage } =
      await answerService.getMyAnswers({ myId, skip, limit, page });

    const cleanAnswers = z.array(AnswerSchema).parse(answers);

    const response = {
      answers: cleanAnswers,
      totalAnswers,
      nextPage,
      success: true,
    };
    return res.status(200).json(response);
  };

  submitAnswer: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const answerForm = AnswerFormSchema.strip().parse(req.body.answerForm);

    await answerService.submitAnswer({ myId, surveyId, answerForm });
    return res.status(200).json({
      success: true,
      message: "Your response was successfully recorded!",
    });
  };
}
