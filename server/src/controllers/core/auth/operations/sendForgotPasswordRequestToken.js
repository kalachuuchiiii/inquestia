const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const User = require("../../../../models/user.js");
const { requestToken } = require("../../../../utils/helpers/requestToken.js");

const sendForgotPasswordRequestToken = async(req, res) => {
  let { email = null } = req.body;
  if(typeof email !== "string"){
    return res.status(400).json({
      success: false,
      message: "Invalid Email."
    })
  } 
  email = email.trim().toLowerCase();
  const user = await User.findOne({ email })

  if(!user){
    return res.status(400).json({
      success: false, 
      message: "User with this email doesn't exist"
    })
  }
  
  const { error } = await requestToken({
    email, 
    user
  });
  
  if(error){
    return res.status(400).json({
      success: false, 
      message: error
    })
  }
  
  return res.status(200).json({
   success: true, 
   message: 'Sent Successfully!'
  })
}

module.exports = build => build({
  name: 'send_request_token_fp', 
  method: 'post', 
  path: '/user/send-request-token-f-p',
  fn: catchError(sendForgotPasswordRequestToken), 
})