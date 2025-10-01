const nodemailer = require('nodemailer');

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(to, subject);
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
   
    const inf = await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: `parissrowlet@gmail.com`,
        to,
        subject,
        html,
      },
      (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });

    return { success: true, data: inf };
  } catch (error) {
    console.log(error)
    throw error;
  }
};