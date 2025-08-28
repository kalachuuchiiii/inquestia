const { textValidator } = require("../../../utils/string.validators.js");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");

exports.validateUsername = catchError(async(req, res, next) => {
const { username = '' } = req?.body?.user || {};

if(!username || !textValidator(username)){
    return res.status(400).json({
      success: false,
      message: !username ? 'Username is required.' : 'Invalid username.'
    })
  }
  
  if(username.length < 6){
    return res.status(400).json({
      success: false, 
      message: "Username must be at least 6 characters long."
    })
  }
  
  if(username.length > 20){
    return res.status(400).json({
      success: false, 
      message: "Username must not exceed 20 characters."
    })
  }
  
  
  req.user.username = username;
  
  next();
})