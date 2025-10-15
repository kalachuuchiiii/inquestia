const mongoose = require("mongoose");
const { default: z } = require("zod");

exports.catchError = (fn = () => { }) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next); 
    } catch (e) {
      console.log(e)
      if(e instanceof z.ZodError){
        const parsed = JSON.parse(e); 
          return res.status(500).json({
          success: false,
          err: parsed,
          message: parsed[0].message || "Internal Server Error."
      })
      }
      return res.status(500).json({
        success: false,
        message: e.message || "Internal Server Error."
      })
    }
  }
}

exports.catchErrorWithSession = (fn = () => { }) => {
  return async (req, res, next) => {
    const session = await mongoose.startSession();
    await session.startTransaction();
    try {
      req.session = session;
      
      const commit = async() => {
        await session.commitTransaction();
      }
    
      await fn(req, res, next, commit); 
      
    } catch (e) {
      console.log(e)
  
      
      await session.abortTransaction();
      return res.status(500).json({
        success: false,
        message: e.message || "Internal Server Error."
      })
    } finally {
      await session.endSession();
    }
  }
}