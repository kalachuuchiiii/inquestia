import logger from "@/config/logger";
import Survey from "@/models/survey/survey";
import User from "@/models/user/user";
import { ObjectIdSchema } from "@/schemas";
import { SurveyService } from "@/services";
import { BadRequestError } from "@/utils/customErrorClass";
import { getNextPage } from "@/utils/getNextPage";
import { QueryParamParser, SurveyFormSchema } from "@inquestia/schemas";
import { AuthorizeUserResponse, GetSurveyByIdResponse, SurveyListResponse } from "@inquestia/types";
import { RequestHandler } from "express";
import z from "zod";

const surveyService = new SurveyService();
export class SurveyController {

  searchSurveys: RequestHandler = async(req, res) => {
      const query = z.string().min(1).parse(req.query.q);
      const { skip, limit, page } = QueryParamParser.parse(req.query);
      const surveyQuery = { $or: [
        { description: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } } ,
        { tags: {
          $in: [query]
        }}
        ]};
  
      const [surveys, totalSurveys] = await Promise.all([
        Survey.find(surveyQuery).skip(skip).limit(limit).populate('authorId').lean(),
        Survey.countDocuments(surveyQuery)
      ])

      
  
      const nextPage = getNextPage({ page, limit, totalResources: totalSurveys });
  
      return res.status(200).json({
        success: true,
        surveys: surveys.map((s) => ({
          ...new Survey(s).getSafeDetails(),
          author: new User(s.authorId).getSafeDetails()
        })),
        totalSurveys,
        nextPage
      })
    }
  

  saveMySurveyAsDraft: RequestHandler = async(req, res) => {
    const survey = SurveyFormSchema.parse(req.body.survey);
    const myId = ObjectIdSchema.parse(req.myId);

   const result = await surveyService.upsertSurveyDraft({ survey, myId });
   logger.info('saved as draft', result);
    return res.status(200).json({
      success: true,
      result,
      message: 'Saved as draft!'
    })
   
    
  }


  createMySurvey: RequestHandler = async(req, res) => {
    const survey = SurveyFormSchema.parse(req.body.survey);
    const myId = ObjectIdSchema.parse(req.myId);
    
    if(survey.isDraft){
      throw new BadRequestError("You can't publish a draft survey", 'PUBLISH_DRAFT_ERROR')
    }

      await surveyService.upsertSurvey({ survey, myId });

     return res.status(200).json({
      success: true,
      message: 'Survey created!'
    })
   

  }

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
    const { safeSurvey, responses } = await surveyService.findById(surveyId);
   
    const response: GetSurveyByIdResponse = {
      success: true,
      survey: safeSurvey,
      responses
    }
    return res.status(200).json(response);
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

  purchaseBoost: RequestHandler = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const quantity = z.number().int().min(1).max(5).parse(req.body.quantity);

    const result = await surveyService.purchaseBoost({ myId, quantity });

    return res.status(200).json({
      success: true,
      ...result
    });
  };
}
