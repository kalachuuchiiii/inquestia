
import {  CodeSchema, LoginFormSchema, RegisterFormSchema } from "@inquestia/schemas";
import { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "@/config/env";
import { ACCESS_TOKEN_JWT_TTL, REFRESH_TOKEN_COOKIE_TTL, REFRESH_TOKEN_JWT_TTL } from "@/constants";
import { AuthService } from "@/services";
import { BadRequestError, UnauthorizedError } from "@/utils/customErrorClass";
import { SessionTokenPayload } from "@/types";
import { SessionResponse } from "@inquestia/types";
import { ObjectIdSchema } from "@/schemas";


const authService = new AuthService();
export class AuthController {

  updatePasswordRequest: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
     const { email } = await authService.updatePasswordRequest(myId);

    return res.status(200).json({
      success: true,
      message: `Verification code has been sent to ${email}`
    })
  }

  logout: RequestHandler = async(req, res) => {
    const refreshToken = req.cookies['refresh_token'];
    if(!refreshToken){
      throw new UnauthorizedError("Session not found.", 'SESSION_NOT_FOUND');
    }
     res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_TOKEN_COOKIE_TTL,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully!'
    })


  }

  refresh: RequestHandler = async(req, res) => {
    const refreshToken = req.cookies['refresh_token'];
    if(!refreshToken)throw new UnauthorizedError('No session found.', 'NO_SESSION_FOUND');
    const payload = await jwt.verify(refreshToken, ENV_CONFIG.JWT_SECRET) as SessionTokenPayload;
    const accessToken = await jwt.sign({ myId: payload.myId }, ENV_CONFIG.JWT_SECRET, { expiresIn: ACCESS_TOKEN_JWT_TTL });
    return res.status(200).json({
      success: true,
      accessToken
    })
  }

  getSession: RequestHandler = async(req, res) => {
    const refreshToken = req.cookies['refresh_token'];
    if(!refreshToken){
      throw new UnauthorizedError('No session found.', 'NO_SESSION_FOUND');
    }

    const payload = await jwt.verify(refreshToken, ENV_CONFIG.JWT_SECRET) as SessionTokenPayload;
    const myId = payload.myId;
    const { user, hasUnreadNotifications } = await authService.getUserData({ myId });
    const accessToken = await jwt.sign({ myId: myId }, ENV_CONFIG.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_JWT_TTL
    })

    const response: SessionResponse = {
      user,
      accessToken,
      hasUnreadNotifications,
      success: true
    }

    return res.status(200).json(response);
  } 

  register: RequestHandler = async(req, res) => {
    const { email, password, username, code } = RegisterFormSchema.extend({ code: CodeSchema }).strip().parse(req.body);
    await authService.register({ email, password, username, code });
    return res.status(201).json({
      success: true,
      message: 'Registered successfully!'
    })
  }

  sendRegisterOTP: RequestHandler = async(req, res) => {
    const { email, username } = RegisterFormSchema.strip().parse(req.body);
    await authService.sendRegisterOTP({ email, username }); //will throw an error if failed
    
    return res.status(200).json({
      success: true,
      message: `Verification code has been sent to ${email}`,
      code: 'VERIFICATION_CODE_SENT'
    })
  }

  login: RequestHandler = async (req, res) => {
   
    const { email, password } = LoginFormSchema.strip().parse(req.body);
    const { user } = await authService.login({ email, password });

    const token = await jwt.sign({ myId: user._id }, ENV_CONFIG.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_JWT_TTL,
    });
    
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_TOKEN_COOKIE_TTL,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  };

  verifyUpdatePasswordRequestCode: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const code = CodeSchema.parse(req.body.code);

    await authService.verifyUpdatePasswordRequestCode({ myId, code });

    return res.status(200).json({
      success: true,
      message: 'Verification code confirmed!'
    })
  }

  updatePassword: RequestHandler = async(req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { password: newPassword } = LoginFormSchema.pick({ password: true }).parse(req.body);

    await authService.updatePassword({ myId, newPassword });

    return res.status(200).json({
      success: true,
      message: 'Password updated successfully!'
    })
  }
}
