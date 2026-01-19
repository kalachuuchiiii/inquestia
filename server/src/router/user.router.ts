import { UserController } from "@/controllers/user.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";




const userRouter = Router();
const userController = new UserController();
const authMiddleware = new AuthMiddlewares();
userRouter.use(catchErrors(authMiddleware.verifyAccessToken));

userRouter.patch('/interests', catchErrors(userController.updateUserInterests));
userRouter.get('/similar-interests', catchErrors(userController.getUsersWithSimilarInterests));

export default userRouter;