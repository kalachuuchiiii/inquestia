const bcrypt = require("bcryptjs");
const { catchError } = require("../../../../utils/errorHandlers/catchError.js");
const { textValidator } = require("../../../../utils/string.validators.js");
const { decodeToken } = require("../../../../utils/auth/jwt.methods.js");
const User = require("../../../../models/user.js");
const { sendEmail } = require("../../../../utils/email/sendEmail.js");

const updatePassword = async (req, res) => {
  let { password, token = null } = req.body;

  if (typeof password !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid fields.",
    })
  }
  password = password.trim();


  if (!password || !textValidator(password)) {
    return res.status(400).json({
      success: false,
      message: !password ? "Password is required." : "Invalid password",
    })
  }

  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({
      success: false,
      message: "Password must contain 8-20 characters only."
    })
  }

  const { user: userId, error = null } = await decodeToken(token);

  const user = await User.findById(userId);

  if (error || !user) {
    return res.status(400).json({
      success: false,
      message: "Token has expired."
    })
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const inf = await user.save();
  const userObj = user.toObject(); 
  delete userObj.password;
  
  const link = `${process.env.WEB_ORIGIN}/login?forgotten=true`;
  
   sendEmail({
    to: inf.email,
    subject: 'Password Updated',
    html: `<div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px;">
  <h2 style="color: #2c3e50;"> Your Password Was Updated</h2>
  <p>Hello,</p>
  <p>This is a confirmation that your account password has been successfully updated.</p>
  
  <p style="margin-top: 20px;">If <strong>you made this change</strong>, no further action is required.</p>
  <p style="color: #e74c3c; margin-top: 10px;">If <strong>you did not update your password</strong>, please change it immediately to secure your account.</p>

  <div style="text-align: center; margin: 30px 0;">
    <a href=${link} style="background: #e74c3c; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
      Change Password Now
    </a>
  </div>

  <p style="font-size: 12px; color: #777;">If the button above doesn’t work, copy and paste this link into your browser:  
  <br><a href=${link}>${link}</a></p>

  <hr style="margin: 30px 0;">
  <p style="font-size: 12px; color: #999; text-align: center;">
    You’re receiving this email because a password change was requested for your account in Inquestia.Ask<br>
    If this wasn’t you, we strongly recommend updating your password right away.
  </p>
</div>`
  })

  return res.status(200).json({
    success: true,
    user: userObj,
    message: 'Password Changed Successfully!'
  })
}

module.exports = build => build({
  name: 'user_password_update',
  path: '/user/update-password',
  method: 'patch',
  fn: catchError(updatePassword),
})