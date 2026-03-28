const { sendEmail } = require("../../../../utils/email/sendEmail.js");
const { validateUserFields } = require("../../../../middlewares/validation/user/validateUserFields.js");
const { checkUserPresence } = require("../../../../middlewares/validation/user/checkUserPresence.js");
const { preventUserDuplication } = require("../../../../middlewares/validation/user/preventUserDuplication.js");
const { validateUsername } = require("../../../../middlewares/validation/user/validateUsername.js");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const crypto = require("crypto");
const redis = require('../../../../config/redis/index.js');

function generateSixDigitCode() {
  const code = crypto.randomInt(0, 1000000);
  return code.toString().padStart(6, "0");
}

const sendVerificationCode = async (req, res) => {

  const { email } = req.user;
  const code = generateSixDigitCode();

    await sendEmail({
    to: email,
    subject: "Your Verification Code for Inquestia.ask",
    html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
    <strong><h1>Inquestia.Ask</h1></strong>
    <p>Hello,</p>
    <p>We received a request to verify your account on <strong>Inquestia.ask</strong>.</p>
    <p style="font-size: 18px; font-weight: bold; color: #000;">
      Your verification code is: 
      <span style="display:inline-block; background:#f4f4f4; padding:8px 12px; border-radius:4px; border:1px solid #ddd;">
        ${code}
      </span>
    </p>
    <p>If you didn't request this, please ignore this email.</p>
    <br>
    <p>Thank you,<br>Inquestia.ask</p>
  </div>`,
    text: `Hello,
    
We received a request to verify your account on Inquestia.ask.

Your verification code is: ${code}

If you didn't request this, please ignore this email.

Thank you.
Inquestia.ask`
  })
  
  await redis.set(`OTP ${email}`, JSON.stringify({code: code.toString()}), { EX: 300 });


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