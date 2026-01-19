import { ENV_CONFIG } from "@/config/environmentVars";
import transporter from "@/config/nodemailer";
import Credential from "@/models/user/credential";
import User from "@/models/user/user";
import { RegisterForm } from "@shared/types";
import bcrypt from "bcryptjs";
import { Attachment } from "nodemailer/lib/mailer";

export class AuthHelper {
  constructor() {}

  doesIdentifiersExist = async ({ email, username }: Pick<RegisterForm, 'email' | 'username'>) => {
    const [isThisEmailAlreadyUsed, isThisUsernameAlreadyUsed] =
      await Promise.all([
        Credential.exists({ email }),
        User.exists({ username }),
      ]);
    return {
      doesEmailExist: isThisEmailAlreadyUsed,
      doesUsernameExist: isThisUsernameAlreadyUsed,
    };
  };

  sendEmail = async ({
    to,
    subject,
    html,
    text,
    attachments = [],
  }: {
    to: string;
    text: string;
    subject: string;
    html: string;
    attachments?: Attachment[];
  }) => {
    try {
      await new Promise((resolve, reject) => {
        transporter.sendMail(
          {
            from: `parissrowlet@gmail.com`,
            to,
            text,
            subject,
            html,
            attachments: attachments || [],
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

      return "OK";
    } catch (error) {
      throw error;
    }
  };

  hash = async (pass: string) => {
    const hashed = await bcrypt.hash(pass.trim(), ENV_CONFIG.SALT_ROUNDS);
    return hashed;
  };
}
