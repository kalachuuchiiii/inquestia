import { ErrorRequestHandler } from "express";
import { CustomError } from "./errors/customErrorClass";
import z from "zod";
import jwt from "jsonwebtoken";
import { TOKEN_MSG } from "@shared/constants";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("errorhandler", error);
  if (error instanceof CustomError) {
    console.log("ha");
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof z.ZodError) {
    const firstIssue = error.issues[0]?.message;
    console.log(firstIssue);
    return res.status(400).json({
      success: false,
      message: firstIssue,
    });
  }

  if (error instanceof jwt.TokenExpiredError) {
    return res.status(400).json({
      success: false,
      message: TOKEN_MSG.expired,
      details: { ...error },
      code: 'EXPIRED_TOKEN'
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message,
  });
};
