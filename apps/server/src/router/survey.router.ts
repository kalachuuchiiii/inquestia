import { SurveyController } from "@/controllers/survey.controller";
import { AnswerController } from "@/controllers/answer.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";

const surveyRouter: Router = Router();
const surveyController = new SurveyController();
const answerController = new AnswerController();
const authMiddleware = new AuthMiddlewares();

surveyRouter.use(catchErrors(authMiddleware.verifyAccessToken));

// Survey management endpoints
surveyRouter.get("/", catchErrors(surveyController.getSurveys));
surveyRouter.get("/search", catchErrors(surveyController.searchSurveys));
surveyRouter.post("/", catchErrors(surveyController.createMySurvey));
surveyRouter.post("/boost", catchErrors(surveyController.purchaseBoost));

surveyRouter.get("/:surveyId", catchErrors(surveyController.getSurveyById));
surveyRouter.get(
  "/:surveyId/draft",
  catchErrors(surveyController.getSurveyDraftById)
);
surveyRouter.delete("/:surveyId", catchErrors(surveyController.softDelete));
surveyRouter.patch(
  "/:surveyId/close",
  catchErrors(surveyController.closeSurvey)
);
surveyRouter.patch(
  "/:surveyId/save",
  catchErrors(surveyController.saveSurveyById)
);
surveyRouter.patch(
  "/:surveyId/reopen",
  catchErrors(surveyController.reOpenSurvey)
);
surveyRouter.patch(
  "/:surveyId/authorize/:userId",
  catchErrors(surveyController.authorizeUser)
);
surveyRouter.patch(
  "/:surveyId/revoke/:userId",
  catchErrors(surveyController.revokeAuthorization)
);

// Answer endpoints (nested under survey)
surveyRouter.post(
  "/:surveyId/answers",
  catchErrors(answerController.submitAnswer)
);
surveyRouter.get(
  "/:surveyId/answers",
  catchErrors(answerController.getSurveyAnswers)
);
surveyRouter.patch(
  "/:surveyId/answers/:answerId/authenticity",
  catchErrors(answerController.toggleAnswerAuthenticity)
);

export default surveyRouter;
