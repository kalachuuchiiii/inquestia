import { errorHandler } from "@/utils/errorHandler";
import { Router } from "express";
import authRouter from "./auth.router";
import surveyRouter from "./survey.router";
import userRouter from "./user.router";
import assistantRouter from "./assistant.router";
import answersRouter from "./answers.router";


export const mainRouter: Router = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use('/survey', surveyRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/assistant', assistantRouter);
mainRouter.use('/answers', answersRouter);


export default mainRouter;