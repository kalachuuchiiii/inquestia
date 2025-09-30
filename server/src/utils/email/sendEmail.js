const transporter = require("../../config/nodemailer/index.js");

const nodemailer = require("nodemailer");

exports.sendEmail = async ({ to, subject, html }) => {
  try {
   
    const info = await transporter.sendMail({
      from: `parissrowlet@gmail.com`, 
      to,
      subject,
      html,
    });

    return { success: true, data: info };
  } catch (error) {
    return { success: false, error: error.message };
  }
};