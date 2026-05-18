import {
  BIO_MAX,
  CORE_MIN,
  INTEREST_ENUM,
  INTERESTS_MAX,
  INTERESTS_MIN,
  LINK_MAX,
  LINK_MIN,
  NICKNAME_MAX,
  NICKNAME_MIN,
  NICKNAME_REGEX,
  STREAK_MIN,
  USER_BOOSTER_MAX,
  USER_BOOSTER_MIN,
  USERNAME_MAX,
  USERNAME_MIN,
  USERNAME_REGEX,
} from "@inquestia/constants";

import { isValidUrl } from "@inquestia/utils";
import mongoose, { type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      minlength: [
        USERNAME_MIN,
        `Username must contain at least ${USERNAME_MIN} characters`,
      ],
      maxlength: [
        USERNAME_MAX,
        `Username must contain at most ${USERNAME_MAX} characters`,
      ],
      lowercase: true,
      validate: {
        validator: (val: string) => USERNAME_REGEX.test(val),
        message: `A username can only contain lowercase letters, numbers, and underscores. No spaces, no symbols, no uppercase.`,
      },
      index: true,
    },

    nickname: {
      minlength: [
        NICKNAME_MIN,
        `Nickname must be at least ${NICKNAME_MIN} characters`,
      ],
      maxlength: [
        NICKNAME_MAX,
        `Nickname must be at most ${NICKNAME_MAX} characters`,
      ],
      type: String,
      validate: {
        validator: (val: string) => NICKNAME_REGEX.test(val),
        message: `Nickname must contain only letters, numbers, spaces, underscores, dots, and hyphens are allowed`,
      },
      index: true,
      default: null,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [BIO_MAX, `Bio can only have at most ${BIO_MAX} characters`],
      default: null,
    },
    interests: {
      type: [String],
      enum: INTEREST_ENUM,
      default: ["personal"],
      validate: {
        validator: (v: string[]) =>
          v.length >= INTERESTS_MIN && v.length <= INTERESTS_MAX,
        message: `You can only select ${INTERESTS_MIN}-${INTERESTS_MAX} interests`,
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
    socialLinks: [
      {
        type: String,
        validate: {
          validator: isValidUrl,
          message: `Invalid URL format`,
        },
        minlength: [LINK_MIN, `Invalid URL format`],
        maxlength: [LINK_MAX, `Invalid URL format`],
      },
    ],
    isFinishedOnboarding: {
      type: Boolean,
      default: false,
    },
    avatarPublicId: {
      type: String,
      default: undefined,
      required: false,
    },
    boosterPoint: {
      type: Number,
      default: USER_BOOSTER_MIN,
      min: [
        USER_BOOSTER_MIN,
        `You can only have ${USER_BOOSTER_MIN}-${USER_BOOSTER_MAX} boosters`,
      ],
      max: [
        USER_BOOSTER_MAX,
        `You can only have ${USER_BOOSTER_MIN}-${USER_BOOSTER_MAX} boosters`,
      ],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const User = mongoose.model("User", userSchema);
export type IUser = InferSchemaType<typeof userSchema>;

export default User;
