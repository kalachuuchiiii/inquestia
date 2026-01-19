
import { ObjectIdSchema } from "@/schemas";
import { SurveyService } from "@/services";
import { QueryParamParser } from "@shared/schemas";
import { SurveyListResponse } from "@shared/types";
import { RequestHandler } from "express";

const surveyService = new SurveyService();
export class SurveyController {
  getSurveys: RequestHandler = async (req, res) => {
    const { page, limit, skip } = QueryParamParser.parse(req.query);
    const userId = ObjectIdSchema.parse(req.userId);
    const { nextPage, surveys, totalSurveys } =
      await surveyService.getSurveyList({ skip, page, limit, userId });

    const response: SurveyListResponse = {
      success: true,
      nextPage,
      surveys,
      totalSurveys,
    };
    return res.status(200).json(response);
  };
}
