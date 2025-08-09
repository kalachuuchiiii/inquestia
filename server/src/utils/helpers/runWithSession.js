const mongoose = require('mongoose');

exports.runWithSession = async(fn = () => {}) => {
  const session = await mongoose.startSession();
  try{
    session.startTransaction();
    const result = await fn(session);
    await session.commitTransaction();
    return result;
  }catch(e){
    await session.abortTransaction();
    throw e;
  }finally{
     session.endSession();
  }
}