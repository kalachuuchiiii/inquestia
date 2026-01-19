import { ENV_CONFIG } from "@/config/environmentVars";
import redis from "@/config/redis";
import { REFRESH_TOKEN_COOKIE_TTL, REFRESH_TOKEN_JWT_TTL } from "@/constants";
import { AuthHelper } from "@/helper";
import Notification from "@/models/notification/notification";
import Credential from "@/models/user/credential";
import User from "@/models/user/user";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors/customErrorClass";
import { runWithSession } from "@/utils/runWithSession";
import { IMPLICIT_PASSWORD_MSG } from "@shared/constants";
import { ExplicitEmailSchema } from "@shared/schemas";
import { LoginForm, RegisterForm } from "@shared/types";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserNotFound = new NotFoundError("User not found.", "USER_NOT_FOUND");

function generateSixDigitCode() {
  const code = crypto.randomInt(0, 1000000);
  return code.toString().padStart(6, "0");
}

const authHelper = new AuthHelper();

export class AuthService {

  getUserData = async({ userId }: {userId: string}) => {
    const user = await User.findById(userId).orFail(new NotFoundError('User not found.', 'USER_NOT_FOUND'))
    const hasUnreadNotifications = !!(await Notification.exists({ isRead: false, receiver: userId }));

    return {
      user,
      hasUnreadNotifications
    }

  }

  register = async ({
    email,
    username,
    password,
    code
  }: Omit<RegisterForm, "hasAcceptedPrivacyPolicy">) => {
    const storedCode = await redis.get(`OTP ${email}`);
    const correctCode = JSON.parse(storedCode ?? '{} ')?.code;

    if(!correctCode){
      throw new BadRequestError('Your verification code has expired', 'EXPIRED_VERIFICATION_CODE');
    }

    if(String(correctCode) !== String(code)){
      throw new BadRequestError('Incorrect verification code.', 'INVALID_VERIFICATION_CODE');
    }

    const seed = Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}`;
    const { doesEmailExist, doesUsernameExist } =
      await authHelper.doesIdentifiersExist({ email, username });
    if (doesEmailExist || doesUsernameExist) {
      throw new ConflictError(
        "Email or username is already in use.",
        "IDENTIFIER_ALREADY_IN_USE"
      );
    }

    return await runWithSession(async(session) => {
       const createdUser = await new User({ username, avatar: avatarUrl }).save({ session });
       const hashedPass = await authHelper.hash(password + ENV_CONFIG.PEPPER);
       const createdCredential = await new Credential({ userId: createdUser._id, email, password: hashedPass }).save({ session });
      return [createdUser, createdCredential];
    })
  };

  sendVerificationCode = async ({
    email,
    username,
  }: Pick<RegisterForm, "email" | "username">) => {
    const { doesUsernameExist, doesEmailExist } =
      await authHelper.doesIdentifiersExist({ email, username });
    if (doesUsernameExist || doesEmailExist) {
      throw new ConflictError(
        "Email or username is already in use.",
        "IDENTIFIER_ALREADY_IN_USE"
      );
    }
    const code = generateSixDigitCode();
    await authHelper.sendEmail({
      to: email,
      subject: "Your Verification Code for Inquestia.ask",
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <strong><h1>Inquestia.Ask</h1></strong>
      <p>Hello,</p>
      <p>We received a request to verify your account on <strong>Inquestia.ask</strong>.</p>
      <p style="font-size: 18px; font-weight: bold; color: #000;">
        Your verification code is: 
        <span style="display:inline-block; background:#f4f4f4; padding:8px 12px; border-radius:4px; border:1px solid #ddd;">
          ${code}
        </span>
      </p>
      <p>If you didn't request this, please ignore this email.</p>
      <br>
      <p>Thank you,<br>Inquestia.ask</p>
    </div>`,
      text: `Hello,
      
  We received a request to verify your account on Inquestia.ask.
  
  Your verification code is: ${code}
  
  If you didn't request this, please ignore this email.
  
  Thank you.
  Inquestia.ask`,
    });

    await redis.set(`OTP ${email}`, JSON.stringify({ code: code.toString() }), {
      EX: 500,
    });

    return "OK";
  };

  //if no credential data (old user with unpeppered pass), compare without pepper > true > create creds with peppered pass
  login = async ({ email, password }: LoginForm) => {
    let credential = await Credential.findOne({ email });
    let user;
    let isPasswordCorrect;

    if (credential) {
      user = await User.findOne({ _id: String(credential.userId) }).orFail(
        UserNotFound
      );
      isPasswordCorrect = await credential.comparePasswords(password); //pepperized
    } else {
      user = await User.findOne({ email }).orFail(UserNotFound);
      const plainUser = user.toObject();
      isPasswordCorrect = await bcrypt.compare(
        password,
        plainUser.password as string
      ); //unpeppered

      if (isPasswordCorrect) {
        const pepperedLegacyPass = await authHelper.hash(
          password + ENV_CONFIG.PEPPER
        ); //peppering
        await new Credential({
          email: plainUser.email,
          password: pepperedLegacyPass,
          role: plainUser.role,
          userId: plainUser._id,
        }).save();
      }
    }

    if (!isPasswordCorrect)
      throw new UnauthorizedError(
        IMPLICIT_PASSWORD_MSG.invalid,
        "INVALID_CREDENTIALS"
      );

    if (user.banDetails.isBanned) {
      throw new ForbiddenError(
        `Your account has been banned. Remaining time: ${formatMs(
          user.banDetails.remainingMS
        )}`,
        "BANNED"
      );
    }

    return {
      user,
    };
  };
}
