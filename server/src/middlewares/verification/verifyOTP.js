const redis = require("../../config/redis/index.js");
const { emailValidator } = require("../../utils/string.validators.js");

exports.verifyOTP = async(req, res, next) => {
  const { email, password, username } = req.user;
  
  let code = req.body.code.toString();
  console.log(code);

  if(code.length !== 6){
    return res.status(400).json({
      success: false, 
      message: `Invalid code`
    })
  }

  
  let cachedCode = JSON.parse(await redis.get(`OTP ${email}`)).code;
  if(!cachedCode){
    return res.status(400).json({
      success: false, 
      message: "Code has expired."
    })
  }
  
  if(code !== cachedCode){
    return res.status(400).json({
      success: false, 
      message: "Incorrect code. Please recheck your email."
    })
  }
  
  next();
}