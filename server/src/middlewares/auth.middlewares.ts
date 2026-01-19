import { ENV_CONFIG } from "@/config/environmentVars";
import { SessionTokenPayload } from "@/types";
import { UnauthorizedError } from "@/utils/errors/customErrorClass";
import { TOKEN_MSG } from "@shared/constants";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export class AuthMiddlewares {
  verifyAccessToken: RequestHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization ?? "";

    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError(TOKEN_MSG.invalid, "INVALID_TOKEN");
    }

    const token = authHeader.split(" ")[1] ?? "";
    const payload = (await jwt.verify(
      token,
      ENV_CONFIG.JWT_SECRET
    )) as SessionTokenPayload;
    req.userId = payload.userId;
    next();
  };
}
