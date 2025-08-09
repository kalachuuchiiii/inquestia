const mongoose = require("mongoose");
const { catchError } = require("../../utils/errorHandlers/catchError.js");

exports.verifyObjectId = catchError(async(req, res, next) => {
  const { resourceId = null } = req.params;
  
  if(!resourceId || !mongoose.Types.ObjectId.isValid(resourceId)){
    return res.status(400).json({
      success: false, 
      message: `${resourceId} is not a valid object id`
    })
  }
  
  req.verifiedId = resourceId;
  next();
})