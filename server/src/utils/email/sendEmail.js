const transporter = require("../../config/nodemailer/index.js");


// utils/sendEmail.js
const nodemailer = require("nodemailer");

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or 'hotmail', 'yahoo', or custom SMTP
      auth: {
        user: "parissrowlet@gmail.com",
        pass: process.env.APP_KEY, 
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `parissrowlet@gmail.com`, // sender address
      to,
      subject,
      html,
    });

    return { success: true, data: info };
  } catch (error) {
    return { success: false, error: error.message };
  }
};