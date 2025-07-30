const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: "parissrowlet@gmail.com", 
    pass: process.env.APP_KEY
  }
})

module.exports = transporter;