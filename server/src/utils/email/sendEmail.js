const crypto = require("crypto");
const redis = require("../../config/redis/index.js");
const transporter = require("../../config/nodemailer/index.js");

function generateSixDigitCode() {
  const code = crypto.randomInt(0, 1000000);
  return code.toString().padStart(6, "0");
}

exports.sendCode = async({to}) => {
  const code = generateSixDigitCode();
   await redis.set(`OTP ${to}`, JSON.stringify({code: code.toString()}), { EX: 3000 });
  console.log(code);
  await transporter.sendMail({
    from: "parissrowlet@gmail.com", 
    to, 
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
}