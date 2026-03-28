import { AssistantController } from "@/controllers/assistant.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";



const assistantRouter = Router();
const assistantController = new AssistantController();
const authMiddleware = new AuthMiddlewares();

assistantRouter.use(catchErrors(authMiddleware.verifyAccessToken));
assistantRouter.get('/conversation', catchErrors(assistantController.getConversation));
assistantRouter.post('/conversation', catchErrors(assistantController.sendMessage));
assistantRouter.delete('/conversation', catchErrors(assistantController.restartConversation));
assistantRouter.get('/summary/:surveyId', catchErrors(assistantController.summarizeSurvey));
assistantRouter.get('/statistics/:surveyId', catchErrors(assistantController.getStatistics));




export default assistantRouter;