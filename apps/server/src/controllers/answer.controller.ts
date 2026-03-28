
import { ObjectIdSchema } from "@/schemas";
import { AnswerService } from "@/services";
import { AnswerFilterSchema, AnswerFormSchema, QueryParamParser } from "@inquestia/schemas";
import { GetMyAnswersResponse } from "@inquestia/types";
import { RequestHandler } from "express";

const answerService = new AnswerService();

export class AnswerController {

  toggleAnswerAuthenticity: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const answerId = ObjectIdSchema.parse(req.params.answerId);
    const isAuthentic = await answerService.toggleIsAuthentic({ myId, answerId });
    return res.status(200).json({
      success: true,
      isAuthentic
    })
  }

  getSurveyAnswers: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const filterForm = AnswerFilterSchema.parse({...(JSON.parse(req.query.filter as string) as any), surveyId });
    const { answers, totalAnswers, nextPage } = await answerService.getSurveyAnswers({ myId, skip, limit, page, filterForm });

    const response: GetMyAnswersResponse = {
      answers,
      totalAnswers: totalAnswers?.[0]?.total ?? 0,
      nextPage: null,
      success: true
    }

    return res.status(200).json(response)
  }

    getMyAnswers: RequestHandler = async(req, res) => {
        const myId = ObjectIdSchema.parse(req.myId);
        const { skip, limit, page } = QueryParamParser.parse(req.query);
        const { answers, totalAnswers, nextPage } = await answerService.getMyAnswers({ myId, skip, limit, page });

        const response: GetMyAnswersResponse = {
            answers,
            totalAnswers,
            nextPage, 
            success: true
        }
        return res.status(200).json({
            success: true,
            answers,
            totalAnswers,
            nextPage
        })
        
    }

  submitAnswer: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const answerForm = AnswerFormSchema.strip().parse(req.body.answerForm);


    await answerService.submitAnswer({ myId, surveyId, answerForm });
    return res.status(200).json({
        success: true,
        message: 'Your response was successfully recorded!'
    })
  };
}
