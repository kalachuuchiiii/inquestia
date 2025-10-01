const transporter = require("../../config/nodemailer/index.js");

exports.sendEmail = async ({ to, subject, html }) => {
  try {
    console.log(to, subject);
   
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