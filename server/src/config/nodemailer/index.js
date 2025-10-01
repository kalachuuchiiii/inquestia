const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "parissrowlet@gmail.com",
    pass: process.env.APP_KEY,
  },
  rejectUnauthorized: false,
  tls: {
    ciphers: "SSLv3",
  },
});

module.exports = transporter;