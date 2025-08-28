const { emailValidator } = require("../string.validators.js");
const { signToken } = require("../auth/jwt.methods.js");
const { sendEmail } = require("../email/sendEmail.js");

exports.requestToken = async({ email = null, user = null}) => {
  
  try {
    if(!email || typeof email !== "string" || !emailValidator(email) || !email){
    throw new Error("Invalid Email.")
  }
  
  const token = await signToken({ user: user._id.toString() }, "3m");
  
  const resetUrl = `${process.env.WEB_ORIGIN}/update-password/${token}`
  
   sendEmail({
     subject: "Your Reset Password Link for Inquestia.ask",
     to: email,
     html: `<div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; background:#ffffff; padding:0; margin:0;">
  <div style="max-width:600px; margin:0 auto; padding:24px;">
    <h1 style="margin:0 0 12px; font-size:24px; color:#111;">Inquestia.ask</h1>
    <p>Hello,</p>
    <p>We received a request to reset the password for your <strong>Inquestia.ask</strong> account.</p>

    <!-- Button (bulletproof for most email clients) -->
    <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:20px 0;">
      <tr>
        <td align="center" bgcolor="#111111" style="border-radius:4px;">
          <a href="${resetUrl}"
             style="display:inline-block; padding:12px 18px; font-size:16px; color:#ffffff; text-decoration:none; border-radius:4px; background:#111111;"
             target="_blank"
             rel="noopener">
             Reset your password
          </a>
        </td>
      </tr>
    </table>

    <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
    <p style="word-break:break-all; background:#f7f7f7; border:1px solid #e5e5e5; padding:8px 12px; border-radius:4px;">
      <a href="${resetUrl}" style="color:#0366d6; text-decoration:underline;" target="_blank" rel="noopener">${resetUrl}</a>
    </p>

    <p style="color:#555; font-size:14px; margin-top:16px;">
      For your security, this link will expire in 3 minutes and can be used only once.
    </p>

    <p>If you didn’t request a password reset, you can safely ignore this email.</p>

    <br>
    <p>Thank you,<br>Inquestia.ask</p>

    <hr style="border:none; border-top:1px solid #eee; margin:24px 0;">
    <p style="font-size:12px; color:#888; margin:0;">
      This is an automated message. Please don’t reply to this email.
    </p>
  </div>
</div>`
  })
  
  return {
    resetUrl
  }
  }catch(e){
    return {
      error: e.message || "Internal Server Error"
    }
  }
}