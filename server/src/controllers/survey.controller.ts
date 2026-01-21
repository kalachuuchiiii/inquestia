import { ObjectIdSchema } from "@/schemas";
import { SurveyService } from "@/services";
import { QueryParamParser } from "@shared/schemas";
import { AuthorizeUserResponse, SurveyListResponse } from "@shared/types";
import { RequestHandler } from "express";

const surveyService = new SurveyService();
export class SurveyController {
  revokeAuthorization: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const candidateUserId = ObjectIdSchema.parse(req.params.candidateUserId);
    const userId = ObjectIdSchema.parse(req.userId);

    const data = await surveyService.revokeAuthorization({
      surveyId,
      candidateUserId,
      userId,
    });

    const response = {
      success: true,
      message: `Revoked authorization successfully!`,
    };

    return res.status(200).json(response);
  };

  authorizeUser: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const candidateUserId = ObjectIdSchema.parse(req.params.candidateUserId);
    const userId = ObjectIdSchema.parse(req.userId);
    const data = await surveyService.authorizeUser({
      surveyId,
      candidateUserId,
      userId,
    });

    const response: AuthorizeUserResponse = {
      success: true,
      message: `Authorized successfully!`,
    };

    return res.status(200).json(response);
  };

  //  GET /api/survey/find-by-id/:surveyId
  getSurveyById: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const survey = await surveyService.findById(surveyId);

    return res.status(200).json({
      success: true,
      survey,
    });
  };

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
