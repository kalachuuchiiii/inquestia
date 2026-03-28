import { AnswerController } from "@/controllers/answer.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";





const answerRouter: Router = Router();
const answerController = new AnswerController();
const authMiddleware = new AuthMiddlewares();


answerRouter.use(catchErrors(authMiddleware.verifyAccessToken));
answerRouter.post('/submit/:surveyId', catchErrors(answerController.submitAnswer))
answerRouter.get('/me', catchErrors(answerController.getMyAnswers))
answerRouter.get('/survey-answers/:surveyId', catchErrors(answerController.getSurveyAnswers))
answerRouter.patch('/authenticity/:answerId', catchErrors(answerController.toggleAnswerAuthenticity))


export default answerRouter;