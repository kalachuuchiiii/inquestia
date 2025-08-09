const { textValidator } = require("../../../utils/string.validators.js");
const { catchError } = require("../../../utils/errorHandlers/catchError.js");

exports.validateUsername = catchError(async(req, res, next) => {
  console.log(req);
const { username = '' } = req?.body?.user || {};

if(!username || !textValidator(username)){
    return res.status(400).json({
      success: false,
      message: !username ? 'Username is required.' : 'Invalid username.'
    })
  }
  
  if(username.length < 8 || username.length > 20){
    return res.status(400).json({
      success: false, 
      message: "Username must contain 8-20 characters only."
    })
  }
  
  req.user.username = username;
  
  next();
})