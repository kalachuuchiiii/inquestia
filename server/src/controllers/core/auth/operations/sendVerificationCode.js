const { sendCode } = require("../../../../utils/email/sendEmail.js");

exports.sendVerificationCode = async(req, res) => {

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