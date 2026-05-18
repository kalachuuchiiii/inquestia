import { ErrorRequestHandler } from "express";
import { CustomError } from "./customErrorClass";
import z from "zod";
import jwt from "jsonwebtoken";

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      success: false,
      message: "Session expired",
      details: { ...error },
      code: "EXPIRED_TOKEN",
    });
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code,
    });
  }

  if (error instanceof z.ZodError) {
    const firstIssue = error.issues[0]?.message;
    return res.status(400).json({
      success: false,
      message: firstIssue,
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message,
  });
};
