const { catchError } = require("../../../utils/errorHandlers/catchError.js");

exports.requireUserPresence = catchError(async(req, res, next) => {
  
  if(!req?.isEmailAlreadyUsed){
    return res.status(400).json({
      success: false, 
      message: "This user doesn't exist", 
      emailPresence: false
    })
  }
  
  req.verifiedUser = req.isEmailAlreadyUsed;
  
  if(!req.verifiedUser){
    return res.status(400).json({
      success: false, 
      message: "User not found."
    })
  }
  
  next();
})