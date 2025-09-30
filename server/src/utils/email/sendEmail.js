const transporter = require("../../config/nodemailer/index.js");

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(to, subject, html);
   
    const info = await transporter.sendMail({
      from: `parissrowlet@gmail.com`, 
      to,
      subject,
      html,
    });
    console.log(info)

    return { success: true, data: info };
  } catch (error) {
    console.log(error)
    return { success: false, error: error.message };
  }
};