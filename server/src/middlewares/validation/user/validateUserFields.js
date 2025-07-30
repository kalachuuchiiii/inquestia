const User = require("../../../models/user.js");
const { emailValidator, textValidator, lengthChecker } = require("../../../utils/string.validators.js")


exports.validateUserFields = async(req, res, next) => {
  let { email, password } = req.body.user;
  
  if(typeof password !== "string" || typeof email !== "string"){
    return res.status(400).json({
      success: false, 
      message: "Invalid fields.",
    })
  }
  email = email.toLowerCase().trim();
  password = password.trim();
  
  if(!email || !emailValidator(email)){
    return res.status(400).json({
      success: false, 
      message: !email ? "Email is required." : "Invalid email format."
    })
  }
  
  if(!password || !textValidator(password)){
    return res.status(400).json({
      success: false, 
      message: !password ? "Password is required." : "Invalid password",
    })
  }
  
  if(password.length < 8 || password.length > 20){
    return res.status(400).json({
      success: false, 
      message: "Password must contain 8-20 characters only."
    })
  }
  
  req.user = {
    email, 
    password, 
  }

next();
}