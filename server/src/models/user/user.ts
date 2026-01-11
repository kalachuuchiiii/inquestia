import {
  BIO_MAX,
  BIO_MSG,
  BOOSTER_MAX,
  BOOSTER_MIN,
  BOOSTER_MSG,
  CORE_MIN,
  INTEREST_ENUM,
  INTERESTS_MAX,
  INTERESTS_MSG,
  LINK_MAX,
  LINK_MIN,
  LINK_MSG,
  NICKNAME_MAX,
  NICKNAME_MIN,
  NICKNAME_MSG,
  NICKNAME_REGEX,
  STREAK_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
  USERNAME_MSG,
  USERNAME_REGEX,
} from "@shared/constants";

import { isValidUrl } from "@shared/utils";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
        default: STREAK_MIN,
        index: true,
      },
      lastResponseTime: {
        type: Date,
        default: () => new Date(),
      },
      current: {
        type: Number,
        default: STREAK_MIN,
        index: true,
      },
    },
    username: {
      type: String,
      unique: true,
      minlength: [USERNAME_MIN, USERNAME_MSG.min],
      maxlength: [USERNAME_MAX, USERNAME_MSG.max],
      lowercase: true,
      validate: {
        validator: (val: string) => USERNAME_REGEX.test(val),
        message: USERNAME_MSG.pattern,
      },
      index: true,
    },
    avatar_public_id: {
      type: String,
      default: null,
    },
    nickname: {
      minlength: [NICKNAME_MIN, NICKNAME_MSG.min],
      maxlength: [NICKNAME_MAX, NICKNAME_MSG.max],
      type: String,
      validate: {
        validator: (val: string) => NICKNAME_REGEX.test(val),
        message: NICKNAME_MSG.pattern,
      },
      index: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [BIO_MAX, BIO_MSG.max],
      default: null,
    },
    interests: {
      type: [String],
      enum: INTEREST_ENUM,
      default: ["personal"],
      validate: {
        validator: (v: string[]) => v.length < INTERESTS_MAX,
        message: INTERESTS_MSG.max,
      },
    },
    lastUsernameUpdate: {
      type: Date,
      default: () => new Date(),
    },
    core: {
      highest: {
        type: Number,
        default: CORE_MIN,
        index: true,
      },
      current: {
        type: Number,
        default: CORE_MIN,
        index: true,
      },
    },
    externalLinks: [
      {
        type: String,
        validate: {
          validator: isValidUrl,
          message: LINK_MSG.invalid,
        },
        minlength: [LINK_MIN, LINK_MSG.min],
        maxlength: [LINK_MAX, LINK_MSG.max],
      },
    ],
    isFinishedOnboarding: {
      type: Boolean,
      default: false,
    },
    boosterPoint: {
      type: Number,
      default: BOOSTER_MIN,
      min: [BOOSTER_MIN, BOOSTER_MSG.min],
      max: [BOOSTER_MAX, BOOSTER_MSG.max],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
