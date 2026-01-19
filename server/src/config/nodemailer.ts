import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { ENV_CONFIG } from "./environmentVars";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "parissrowlet@gmail.com",
    pass: ENV_CONFIG.EMAIL_KEY
  },
  rejectUnauthorized: false,
  tls: {
    ciphers: "SSLv3",
  },
} as SMTPTransport.Options);

export default transporter;
