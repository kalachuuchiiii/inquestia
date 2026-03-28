import { ENV_CONFIG } from "@/config/env";
import Credential from "@/models/user/credential";
import User from "@/models/user/user";
import { RegisterForm } from "@inquestia/types";
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


  hash = async (pass: string) => {
    const hashed = await bcrypt.hash(pass.trim(), ENV_CONFIG.SALT_ROUNDS);
    return hashed;
  };
}
