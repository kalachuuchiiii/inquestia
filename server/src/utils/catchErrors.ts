import { RequestHandler } from "express";




exports.catchErrors = (fn: RequestHandler): RequestHandler => {
    const wrapped: RequestHandler = async(req, res, next) => {
        try{
          await fn(req, res, next);
        }catch(e: unknown){
            next(e);
        }
    }
  
    return wrapped;
}