
import {  CodeSchema, LoginFormSchema, RegisterFormSchema } from "@shared/schemas";
import { RequestHandler } from "express";

import jwt from "jsonwebtoken";
import { ENV_CONFIG } from "@/config/environmentVars";
import { ACCESS_TOKEN_JWT_TTL, REFRESH_TOKEN_COOKIE_TTL, REFRESH_TOKEN_JWT_TTL } from "@/constants";
import { AuthService } from "@/services";
import { UnauthorizedError } from "@/utils/errors/customErrorClass";
import { SessionTokenPayload } from "@/types";
import { SessionResponse } from "@shared/types";


const authService = new AuthService();
export class AuthController {

  refresh: RequestHandler = async(req, res) => {
    const refreshToken = req.cookies['refresh_token'];
    if(!refreshToken)throw new UnauthorizedError('No session found.', 'NO_SESSION_FOUND');
    const payload = await jwt.verify(refreshToken, ENV_CONFIG.JWT_SECRET) as SessionTokenPayload;
    const accessToken = await jwt.sign({ userId: payload.userId }, ENV_CONFIG.JWT_SECRET, { expiresIn: ACCESS_TOKEN_JWT_TTL });
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
    const userId = payload.userId;
    const { user, hasUnreadNotifications } = await authService.getUserData({ userId });
    const accessToken = await jwt.sign({ userId: userId }, ENV_CONFIG.JWT_SECRET, {
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

  sendVerificationCode: RequestHandler = async(req, res) => {
    const { email, username } = RegisterFormSchema.strip().parse(req.body);
    await authService.sendVerificationCode({ email, username }); //will throw an error if failed
    
    return res.status(200).json({
      success: true,
      message: `Verification code has been sent to ${email}`,
      code: 'VERIFICATION_CODE_SENT'
    })
  }

  login: RequestHandler = async (req, res) => {
   
    const { email, password } = LoginFormSchema.strip().parse(req.body);
    const { user } = await authService.login({ email, password });

    const token = await jwt.sign({ userId: user._id }, ENV_CONFIG.JWT_SECRET, {
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
}
