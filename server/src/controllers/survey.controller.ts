import { ObjectIdSchema } from "@/schemas";
import { SurveyService } from "@/services";
import { QueryParamParser } from "@shared/schemas";
import { AuthorizeUserResponse, SurveyListResponse } from "@shared/types";
import { RequestHandler } from "express";

const surveyService = new SurveyService();
export class SurveyController {
  reOpenSurvey: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const myId = ObjectIdSchema.parse(req.myId);
    await surveyService.reOpenSurvey({ surveyId, myId });
    return res.status(200).json({
      success: true,
      message: "Re-opened successfully!",
    });
  };

  closeSurvey: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const myId = ObjectIdSchema.parse(req.myId);
    await surveyService.closeSurvey({ surveyId, myId });
    return res.status(200).json({
      success: true,
      message: "Closed successfully!",
    });
  };

  softDelete: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const myId = ObjectIdSchema.parse(req.myId);
    await surveyService.softDelete({ surveyId, myId });
    return res.status(200).json({
      success: true,
      message: "Deleted successfully!",
    });
  };
  revokeAuthorization: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const userId = ObjectIdSchema.parse(req.params.userId);
    const myId = ObjectIdSchema.parse(req.myId);

    const data = await surveyService.revokeAuthorization({
      surveyId,
      userId,
      myId,
    });

    const response = {
      success: true,
      message: `Revoked authorization successfully!`,
    };

    return res.status(200).json(response);
  };

  authorizeUser: RequestHandler = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const userId = ObjectIdSchema.parse(req.params.userId);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await surveyService.authorizeUser({
      surveyId,
      userId,
      myId,
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
    const { page, limit } = QueryParamParser.parse(req.query);
    const myId = ObjectIdSchema.parse(req.myId);
    const { nextPage, surveys, totalSurveys } =
      await surveyService.getSurveyList({ page, limit, myId });

    const response: SurveyListResponse = {
      success: true,
      nextPage,
      surveys,
      totalSurveys,
    };
    return res.status(200).json(response);
  };
}
