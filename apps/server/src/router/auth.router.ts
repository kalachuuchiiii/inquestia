import { AuthController } from "@/controllers/auth.controller";
import { AuthMiddlewares } from "@/middlewares/auth.middlewares";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";



const authRouter: Router = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddlewares();

authRouter.post('/login', catchErrors(authController.login));
authRouter.post('/register-otp', catchErrors(authController.sendRegisterOTP))
authRouter.post('/register', catchErrors(authController.register))
authRouter.get('/session', catchErrors(authController.getSession));
authRouter.post('/refresh', catchErrors(authController.refresh));
authRouter.post('/logout', catchErrors(authController.logout));

authRouter.post('/update-password-request', catchErrors(authMiddleware.verifyAccessToken), catchErrors(authController.updatePasswordRequest));
authRouter.post('/verify-update-password-code', catchErrors(authMiddleware.verifyAccessToken), catchErrors(authController.verifyUpdatePasswordRequestCode));
authRouter.post('/update-password', catchErrors(authMiddleware.verifyAccessToken), catchErrors(authController.updatePassword));


export default authRouter;