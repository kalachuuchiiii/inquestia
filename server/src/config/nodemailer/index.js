

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "parissrowlet@gmail.com",
    pass: process.env.APP_KEY
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 20000
});

transporter.verify((error, success) => {
  if (error) console.log("SMTP error:", error);
  else console.log("SMTP ready:", success);
});

module.exports = transporter;
