import { INTEREST_ENUM } from "@shared/constants";

export type Interest = (typeof INTEREST_ENUM)[number];

export interface UserStreak {
  highest: number;
  current: number;
}

export interface UserCore {
  highest: number;
  current: number;
}

export interface UserBadge {
  badge: string;
  pointsRequired: number;
  style: string;
}

export type UserDTO = {
  _id: string;
  username: string;
  nickname?: string | null;
  displayName: string;
  avatar?: string;
  bio?: string | null;
  externalLinks: string[];
  streak: UserStreak;
  core: UserCore;
  badge: UserBadge
};

export type UpdateInterestResponse = {
  success: boolean;
  interests: string[];
  message: string;
}

export type GetUsersWithSimilarInterestsResponse = {
  success: boolean;
  users: UserDTO[];
}

export type GetUserByUsernameResponse = {
  userResult: UserDTO;
  success: boolean;
}