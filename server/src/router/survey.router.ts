import { SurveyController } from "@/controllers/survey.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";

const surveyRouter = Router();
const surveyController = new SurveyController();
const authMiddleware = new AuthMiddlewares();

surveyRouter.use(catchErrors(authMiddleware.verifyAccessToken));

surveyRouter.get("/list", catchErrors(surveyController.getSurveys));
surveyRouter.get("/find-by-id/:surveyId", catchErrors(surveyController.getSurveyById));
surveyRouter.patch('/authorize-user/:surveyId/:userId', catchErrors(surveyController.authorizeUser));
surveyRouter.patch('/revoke-authorization/:surveyId/:userId', catchErrors(surveyController.revokeAuthorization));
surveyRouter.patch('/soft-delete/:surveyId', catchErrors(surveyController.softDelete));
surveyRouter.patch('/close-survey/:surveyId', catchErrors(surveyController.closeSurvey));
surveyRouter.patch('/reopen-survey/:surveyId', catchErrors(surveyController.reOpenSurvey));

export default surveyRouter;
