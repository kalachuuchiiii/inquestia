import { Types } from "mongoose";
import { INTEREST_ENUM } from "@shared/constants";

export type Interest = (typeof INTEREST_ENUM)[number];

export interface UserStreak {
  highest: number;
  current: number;
  lastResponseTime: Date;
}

export interface UserCore {
  highest: number;
  current: number;
}

export interface IUser {
  _id: Types.ObjectId;

  username: string;
  nickname?: string | null;

  avatar?: string;
  avatar_public_id?: string | null;

  bio?: string | null;

  interests: Interest[];

  externalLinks: string[];

  isFinishedOnboarding: boolean;

  boosterPoint: number;

  bannedAt?: Date | null;
  banDuration?: number | null;

  lastUsernameUpdate: Date;

  streak: UserStreak;
  core: UserCore;

  createdAt: Date;
  updatedAt: Date;
}
