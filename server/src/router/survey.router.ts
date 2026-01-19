import { SurveyController } from "@/controllers/survey.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";

const surveyRouter = Router();
const surveyController = new SurveyController();
const authMiddleware = new AuthMiddlewares();

surveyRouter.use(catchErrors(authMiddleware.verifyAccessToken));

surveyRouter.get("/list", catchErrors(surveyController.getSurveys));

export default surveyRouter;
