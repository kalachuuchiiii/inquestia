import { ENV_CONFIG } from "@/config/env";
import { SessionTokenPayload } from "@/types";
import { UnauthorizedError } from "@/utils/customErrorClass";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddlewares {
  verifyAccessToken: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Invalid Token", "INVALID_TOKEN");
    }

    const token = authHeader.split(" ")[1] ?? "";
    const payload = jwt.verify(
      token,
      ENV_CONFIG.JWT_SECRET
    ) as SessionTokenPayload;
    req.myId = payload.myId;
    req.accessToken = token;
    next();
  };
}
