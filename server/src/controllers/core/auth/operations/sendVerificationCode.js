const { sendCode } = require("../../../../utils/email/sendEmail.js");
const { validateUserFields } = require("../../../../middlewares/validation/user/validateUserFields.js");
const {checkUserPresence} = require("../../../../middlewares/validation/user/checkUserPresence.js");
const { preventUserDuplication } = require("../../../../middlewares/validation/user/preventUserDuplication.js");
const { validateUsername } = require("../../../../middlewares/validation/user/validateUsername.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");

const sendVerificationCode = async(req, res) => {

  const { email } = req.user; 
  
  await sendCode({
    to: email, 
  })
  
  return res.status(200).json({
   success: true, 
   message: "Code was sent!", 
   sent: true
  })
}

module.exports = (build) => {
  build({
  name: "register_otp",
  method: "post",
  path: "/user/register/otp",
  middlewares: [validateUserFields, validateUsername, checkUserPresence, preventUserDuplication],
  fn: catchError(sendVerificationCode)
})
};