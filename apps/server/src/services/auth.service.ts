import { ENV_CONFIG } from "@/config/env";
import gmail from "@/config/gmail";

import { createRawEmail } from '@/utils/createRawEmail';
import { REFRESH_TOKEN_COOKIE_TTL, REFRESH_TOKEN_JWT_TTL } from "@/constants";
import { AuthHelper } from "@/helper";
import Credential from "@/models/user/credential";
import User, { UserModel } from "@/models/user/user";
import { OTPStore } from "@/store/OTPStore";
import { verifiedEntriesStore } from "@/store/VerifiedOTPEntryStore";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/customErrorClass";
import { runWithSession } from "@/utils/runWithSession";
import { IMPLICIT_PASSWORD_MSG } from "@inquestia/constants";
import { ExplicitEmailSchema } from "@inquestia/schemas";
import { LoginForm, RegisterForm } from "@inquestia/types";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserNotFound = new NotFoundError("User not found.", "USER_NOT_FOUND");

function generateSixDigitCode() {
  const code = crypto.randomInt(0, 1000000);
  return code.toString().padStart(6, "0");
}

const authHelper = new AuthHelper();

export class AuthService {
  updatePassword = async ({
    myId,
    newPassword,
  }: {
    myId: string;
    newPassword: string;
  }) => {
    const key = `update-password:request:${myId}`;
    const isVerified = verifiedEntriesStore.isVerified(`verified-otp:${myId}`);

    if (!isVerified) {
      throw new UnauthorizedError(
        "Password update request not verified.",
        "UNVERIFIED_PASSWORD_UPDATE_REQUEST"
      );
    }

    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );

    const credential = await Credential.findOne({ userId: myId }).orFail(new NotFoundError('Credentials not found.', 'CREDENTIAL_NOT_FOUND'));

    const hashedPass = await authHelper.hash(newPassword);
    credential.password = hashedPass;
    OTPStore.delete(key);

    return await credential.save();
  };

  verifyUpdatePasswordRequestCode = async ({
    myId,
    code,
  }: {
    myId: string;
    code: string;
  }) => {
    const key = `update-password:request:${myId}`;
    const storedData = OTPStore.get(key);
    if (!storedData) {
      throw new BadRequestError(
        "Your verification code has expired.",
        "EXPIRED_VERIFICATION_CODE"
      );
    }
    const isCorrectCode = await OTPStore.isCodeCorrect(key, code);
    if (!isCorrectCode) {
      throw new BadRequestError(
        "Incorrect verification code.",
        "INVALID_VERIFICATION_CODE"
      );
    }

    OTPStore.delete(key);
    verifiedEntriesStore.verifyEntry(`verified-otp:${myId}`);
    return "OK";
  };

  updatePasswordRequest = async (myId: string) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const code = generateSixDigitCode();
    OTPStore.setOTP(`update-password:request:${myId}`, code);
    const { email } = await Credential.findOne({ userId: myId })
      .orFail(
        new NotFoundError("Credentials not found.", "CREDENTIAL_NOT_FOUND")
      )
      .lean();

    const raw = createRawEmail(
      email,
      "Your Verification Code for Inquestia.ask",
      `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
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
    </div>`
    );

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw,
      },
    });

    return {
      email,
      user,
    };
  };

  getUserData = async ({ myId }: { myId: string }) => {
    const user = await User.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const { email } = await Credential.findOne({ userId: user._id }).orFail(
      new NotFoundError("Credentials not found.", "CREDENTIAL_NOT_FOUND")
    );

    return {
      user: { ...user.toObject(), email }
    };
  };

  register = async ({
    email,
    username,
    password,
    code,
  }: Omit<RegisterForm, "hasAcceptedPrivacyPolicy">) => {
    const key = `register:request:${email}`;
    const isCorrectCode = await OTPStore.isCodeCorrect(key, code);

    if (!isCorrectCode) {
      throw new BadRequestError(
        "Your verification code is incorrect or has expired",
        "EXPIRED_VERIFICATION_CODE"
      );
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

    return await runWithSession(async (session) => {
      const createdUser = await new User({ username, avatar: avatarUrl }).save({
        session,
      });
      const hashedPass = await authHelper.hash(password);
      const createdCredential = await new Credential({
        userId: createdUser._id,
        email,
        password: hashedPass,
      }).save({ session });
      return [createdUser, createdCredential];
    });
  };

  sendRegisterOTP = async ({
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

    const raw = createRawEmail(
      email,
      "Your Verification Code for Inquestia.ask",
       `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
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
    </div>`
    )

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw
      }
    })
 
    const key = `register:request:${email}`;
    OTPStore.setOTP(key, code);

    return "OK";
  };

  login = async ({ email, password }: LoginForm) => {
    let credential = await Credential.findOne({ email }).orFail(new NotFoundError("Credentials not found.", 'CREDENTIAL_NOT_FOUND'));

      const user = await User.findOne({
        _id: String(credential.userId),
      }).orFail(UserNotFound);
      const isPasswordCorrect = await credential.comparePasswords(password); 

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
      const plain = user.toObject();
      return { user };

  };
}
