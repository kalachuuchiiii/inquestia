import { z } from "zod";
import {
  USERNAME_MIN,
  USERNAME_MAX,
  USERNAME_REGEX,
  USERNAME_MSG,
  NICKNAME_MIN,
  NICKNAME_MAX,
  NICKNAME_REGEX,
  NICKNAME_MSG,
  BIO_MAX,
  BIO_MSG,
  INTERESTS_MAX,
  INTERESTS_MSG,
  STREAK_MIN,
  STREAK_MAX,
  CORE_MIN,
  CORE_MAX,
  BOOSTER_MIN,
  BOOSTER_MAX,
  LINK_MIN,
  LINK_MAX,
  LINK_MSG,
  BAN_MIN_DAYS,
  BAN_MAX_DAYS,
  BAN_MSG,
  BOOSTER_MSG,
  INTEREST_ENUM,
  LINKS_MAX,
} from "../constants/user.constraints";

export const bannedAt = z.date();
export const banDuration = z
  .number()
  .int()
  .min(BAN_MIN_DAYS, BAN_MSG.min)
  .max(BAN_MAX_DAYS, BAN_MSG.max);

export const username = z
  .string()
  .min(USERNAME_MIN, USERNAME_MSG.min)
  .max(USERNAME_MAX, USERNAME_MSG.max)
  .regex(USERNAME_REGEX, USERNAME_MSG.pattern);

export const nickname = z
  .string()
  .min(NICKNAME_MIN, NICKNAME_MSG.min)
  .max(NICKNAME_MAX, NICKNAME_MSG.max)
  .regex(NICKNAME_REGEX, NICKNAME_MSG.pattern);

export const avatar = z.string();
export const bio = z.string().max(BIO_MAX, BIO_MSG.max);
export const isFinishedOnboarding = z.boolean();
export const boosterPoint = z
  .number()
  .int()
  .min(BOOSTER_MIN, BOOSTER_MSG.min)
  .max(BOOSTER_MAX, BOOSTER_MSG.max);

export const interestName = z.enum(INTEREST_ENUM);

export const interests = z
  .array(interestName)
  .max(INTERESTS_MAX, INTERESTS_MSG.max);

export const externalLink = z
  .string()
  .url(LINK_MSG.invalid)
  .min(LINK_MIN, LINK_MSG.min)
  .max(LINK_MAX, LINK_MSG.max);

export const externalLinks = z.array(externalLink).max(LINKS_MAX);

export const streakHighest = z.number().int().min(STREAK_MIN).max(STREAK_MAX);
export const streakCurrent = z.number().int().min(STREAK_MIN).max(STREAK_MAX);
export const streakLastResponseTime = z.date();

export const streakSchema = z.object({
  highest: streakHighest,
  current: streakCurrent,
  lastResponseTime: streakLastResponseTime
});


export const coreHighest = z.number().int().min(CORE_MIN).max(CORE_MAX);
export const coreCurrent = z.number().int().min(CORE_MIN).max(CORE_MAX);

export const coreSchema = z.object({
  highest: coreHighest,
  current: coreCurrent
})

export const createAt = z.date();
export const updatedAt = z.date();
