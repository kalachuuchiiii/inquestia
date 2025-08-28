
const transporter = require("../../config/nodemailer/index.js");

exports.sendEmail = async({to, subject, html}) => {
  return await transporter.sendMail({
    from: "parissrowlet@gmail.com", 
    to, 
    subject,
    html
  });
}