import { INTEREST_ENUM } from "@shared/constants";
import { SurveyDTO } from "./survey";

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
  socialLinks: string[];
  streak: UserStreak;
  core: UserCore;
  badge: UserBadge;
  email?: string;
};

export type UpdateInterestResponse = {
  success: boolean;
  interests: string[];
  message: string;
};

export type GetUsersWithSimilarInterestsResponse = {
  success: boolean;
  users: UserDTO[];
};

export type GetUserByUsernameResponse = {
  user: UserDTO;
  success: boolean;
};

export type GetOwnedSurveysResponse = {
  surveys: SurveyDTO[];
  success: boolean;
  nextPage: number | null;
  totalSurveys: number;
};

export type GetSurveysSharedToMeResponse = {
  sharedSurveys: SurveyDTO[];
  success: boolean;
  nextPage: number | null;
  totalSharedSurveys: number;
};

export type UpdateMyAvatarResponse = {
  success: boolean;
  message: string;
  avatarUrl: string;
};

export type GetUserSurveysReponse = {
  success: boolean;
  surveys: SurveyDTO[];
  totalSurveys: number;
  nextPage: number | null;
};
