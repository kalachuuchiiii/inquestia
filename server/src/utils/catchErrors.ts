import { RequestHandler } from "express";

export const catchErrors = (fn: RequestHandler): RequestHandler => {
  const wrapped: RequestHandler = async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (e: unknown) {
      next(e);
    }
  };

  return wrapped;
};
