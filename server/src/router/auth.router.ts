import { AuthController } from "@/controllers/auth.controller";
import { catchErrors } from "@/utils/catchErrors";
import { Router } from "express";



const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', catchErrors(authController.login));
authRouter.post('/verify-email', catchErrors(authController.sendVerificationCode))
authRouter.post('/register', catchErrors(authController.register))
authRouter.get('/session', catchErrors(authController.getSession));
authRouter.post('/refresh', catchErrors(authController.refresh));


export default authRouter;