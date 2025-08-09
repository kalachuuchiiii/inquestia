const mongoose = require("mongoose");
exports.catchError = (fn = () => { }) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next); 
    } catch (e) {

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