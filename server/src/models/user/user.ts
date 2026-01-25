
import {
  BIO_MAX,
  BIO_MSG,
  BOOSTER_MAX,
  BOOSTER_MIN,
  BOOSTER_MSG,
  CORE_MIN,
  INTEREST_ENUM,
  INTERESTS_MAX,
  INTERESTS_MIN,
  INTERESTS_MSG,
  LINK_MAX,
  LINK_MIN,
  LINK_MSG,
  NICKNAME_MAX,
  NICKNAME_MIN,
  NICKNAME_MSG,
  NICKNAME_REGEX,
  STREAK_MIN,
  USER_BADGES,
  USERNAME_MAX,
  USERNAME_MIN,
  USERNAME_MSG,
  USERNAME_REGEX,
} from "@shared/constants";
import { Interest, UserBadge, UserDTO } from "@shared/types";

import { isValidUrl } from "@shared/utils";
import mongoose, { Document, HydratedDocument, InferSchemaType } from "mongoose";

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
      default: null
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
        validator: (v: Interest[]) =>
          v.length >= INTERESTS_MIN && v.length <= INTERESTS_MAX,
        message: INTERESTS_MSG.range,
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
      }
    },
    socialLinks: [
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
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.virtual("banDetails").get(function () {
  const data = { isBanned: false, remainingMS: 0 };
  if (!this.bannedAt || !this.banDuration) return data;

  const bannedFor = Date.now() - new Date(this.bannedAt).getTime();
  data.isBanned = bannedFor < this.banDuration;
  data.remainingMS = this.banDuration - bannedFor;

  return data;
});

userSchema.virtual("badge").get(function () {
  const badges = USER_BADGES.sort((a, b) => b.pointsRequired - a.pointsRequired);
  const badge: UserBadge = badges.find((b) => (this.core?.current ?? 0) >= b.pointsRequired);
  return badge;
});

userSchema.virtual("displayName").get(function () {
  const displayName = this.nickname ?? this.username;
  return displayName;
});

userSchema.methods.getSafeDetails = function () {
  const safeDetails = {
    username: this.username,
    nickname: this.nickname,
    displayName: this.displayName,
    badge: this.badge,
    _id: this._id,
    bio: this.bio,
    core: this.core,
    streak: { current: this.streak.current, highest: this.streak.highest },
    avatar: this.avatar,
    socialLinks: this.socialLinks,
  } satisfies UserDTO;
  return safeDetails;
};

export type UserSchema = InferSchemaType<typeof userSchema>;
export type UserMethods = { 
  banDetails: { isBanned: boolean; remainingMS: number },
  badge: UserBadge;
  displayName: string;
  password?: string;
  email?: string;
  role?: 'admin' | 'user'
  getSafeDetails: () => UserDTO;
}
export type UserModel = HydratedDocument<UserSchema, UserMethods>;

const User = mongoose.model<UserModel>("User", userSchema);

export default User;
