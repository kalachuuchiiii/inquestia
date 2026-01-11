import { interests } from "@shared/constants";
import { isValidEmail, isValidUrl } from "@shared/utils";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  USER_NICKNAME_LENGTH_MAX,
  USER_NICKNAME_LENGTH_MESSAGE,
  USER_NICKNAME_LENGTH_MIN,
  USER_USERNAME_LENGTH_MESSAGE,
  USER_USERNAME_LENGTH_MIN,
  USER_USERNAME_PATTERN_REGEX,
} from "@shared/constraints";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    bannedAt: {
      type: Date,
      default: null,
    },
    banDuration: {
      type: Number,
      default: null,
    },
    streak: {
      highest: {
        type: Number,
        default: 1,
        index: true,
      },
      lastResponseTime: {
        type: Date,
        default: () => new Date(),
      },
      current: {
        type: Number,
        default: 1,
        index: true,
      },
    },
    username: {
      type: String,
      unique: true,
      minlength: [USER_USERNAME_LENGTH_MIN, USER_USERNAME_LENGTH_MESSAGE],
      maxlength: [USER_USERNAME_LENGTH_MIN, USER_USERNAME_LENGTH_MESSAGE],
      lowercase: true,
      validate: {
        validator: (val: string) => USER_USERNAME_PATTERN_REGEX.test(val),
        message: USER_USERNAME_LENGTH_MESSAGE,
      },
      index: true,
    },
    avatar_public_id: {
      type: String,
      default: null,
    },
    nickname: {
      minlength: [USER_NICKNAME_LENGTH_MIN, USER_NICKNAME_LENGTH_MESSAGE],
      maxlength: [USER_NICKNAME_LENGTH_MAX, USER_NICKNAME_LENGTH_MESSAGE],
      type: String,
      index: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [100, "Bio can only contain 100 characters"],
      default: "",
    },
    interests: {
      type: [String],
      enum: interests,
      default: ["personal"],
      validate: {
        validator: function (val: string[]) {
          return val.length <= 10;
        },
        message: "You can select up to 10 interests.",
      },
    },
    lastUsernameUpdate: {
      type: Date,
      default: () => new Date(),
    },
    core: {
      highest: {
        type: Number,
        default: 0,
        index: true,
      },
      current: {
        type: Number,
        default: 0,
        index: true,
      },
    },
    externalLinks: [
      {
        type: String,
        validate: {
          validator: isValidUrl,
          message: "Invalid Url.",
        },
        minlength: 6,
        maxlength: 46,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: {
        validator: isValidEmail,
        message: "Invalid email format.",
      },
      index: true,
    },
    isFinishedOnboarding: {
      type: Boolean,
      default: false,
    },
    boosterPoint: {
      type: Number,
      default: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePasswords = async function (candidatePass: string) {
  return await bcrypt.compare(candidatePass, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
