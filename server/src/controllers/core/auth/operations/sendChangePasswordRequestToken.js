
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const User = require("../../../../models/user.js");
const { requestToken } = require("../../../../utils/helpers/requestToken.js");
const { verifySession } = require("../../../../middlewares/verification/verifySession.js");

const sendChangePasswordRequestToken = async(req, res) => {
  
  const { verifiedUser } = req; 
  const email = verifiedUser.email.trim().toLowerCase();
  
  const { error } = await requestToken({ email, user: verifiedUser })
  
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
  name: 'send_request_token', 
  method: 'post', 
  path: '/user/send-request-token-c-p',
  middlewares: [verifySession],
  fn: catchError(sendChangePasswordRequestToken), 
})