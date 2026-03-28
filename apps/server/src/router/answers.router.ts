import { AnswerController } from "@/controllers/answer.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";

const answersRouter: Router = Router();
const answerController = new AnswerController();
const authMiddleware = new AuthMiddlewares();

answersRouter.use(catchErrors(authMiddleware.verifyAccessToken));

// User's own answers
answersRouter.get("/me", catchErrors(answerController.getMyAnswers));

export default answersRouter;
