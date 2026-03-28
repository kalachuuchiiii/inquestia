import upload from "@/config/multer";
import { UserController } from "@/controllers/user.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";




const userRouter: Router = Router();
const userController = new UserController();
const authMiddleware = new AuthMiddlewares();
userRouter.use(catchErrors(authMiddleware.verifyAccessToken));

userRouter.patch('/me/interests', catchErrors(userController.updateUserInterests));
userRouter.get('/me/similar-interests', catchErrors(userController.getUsersWithSimilarInterests));
userRouter.get('/username/:username', catchErrors(userController.getUserByUsername));
userRouter.get('/me/surveys', catchErrors(userController.getMySurveys));
userRouter.get('/me/shared-to-me', catchErrors(userController.getSurveysSharedToMe));
userRouter.patch('/me/username', catchErrors(userController.updateMyUsername));
userRouter.patch('/me/nickname', catchErrors(userController.updateMyNickname));
userRouter.patch('/me/bio', catchErrors(userController.updateMyBio));
userRouter.patch('/me/avatar', upload.single('avatar'), catchErrors(userController.updateMyAvatar));
userRouter.patch('/me/social-links', catchErrors(userController.updateMySocialLinks));
userRouter.get('/surveys/:userId', catchErrors(userController.getUserSurveys));
userRouter.get('/leaderboard', catchErrors(userController.getLeaderboards));
userRouter.get('/search', catchErrors(userController.searchUsers));


export default userRouter;