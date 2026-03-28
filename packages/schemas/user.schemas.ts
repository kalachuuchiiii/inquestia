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
  INTERESTS_MIN,
  AVATAR_MAX_SIZE,
  AVATAR_MSG,
} from "@inquestia/constants";
import { isBuffer } from "lodash";

export const BannedAtSchema = z.date();
export const BanDurationSchema = z
  .number()
  .int()
  .min(BAN_MIN_DAYS, BAN_MSG.min)
  .max(BAN_MAX_DAYS, BAN_MSG.max);

export const AvatarTypeSchema = z
  .string()
  .refine((file) => file.startsWith("image/"), {
    message: AVATAR_MSG.type,
  });

export const AvatarSizeSchema = z
  .number()
  .max(AVATAR_MAX_SIZE, AVATAR_MSG.size);
// max size

export const UsernameSchema = z
  .string()
  .min(USERNAME_MIN, USERNAME_MSG.min)
  .max(USERNAME_MAX, USERNAME_MSG.max)
  .regex(USERNAME_REGEX, USERNAME_MSG.pattern);

export const NicknameSchema = z
  .string()
  .min(NICKNAME_MIN, NICKNAME_MSG.min)
  .max(NICKNAME_MAX, NICKNAME_MSG.max)
  .regex(NICKNAME_REGEX, NICKNAME_MSG.pattern);

export const AvatarSchema = z.string();
export const BioSchema = z.string().max(BIO_MAX, BIO_MSG.max);
export const IsFinishedOnboardingSchema = z.boolean();
export const BoosterPointSchema = z
  .number()
  .int()
  .min(BOOSTER_MIN, BOOSTER_MSG.min)
  .max(BOOSTER_MAX, BOOSTER_MSG.max);

export const InterestSchema = z.enum(INTEREST_ENUM, INTERESTS_MSG.invalid);

export const InterestListSchema = z
  .array(InterestSchema)
  .min(INTERESTS_MIN, INTERESTS_MSG.range)
  .max(INTERESTS_MAX, INTERESTS_MSG.range);

export const SocialLinkSchema = z
  .string()
  .url(LINK_MSG.invalid)
  .min(LINK_MIN, LINK_MSG.min)
  .max(LINK_MAX, LINK_MSG.max);

export const SocialLinkListSchema = z.array(SocialLinkSchema).max(LINKS_MAX);

export const StreakHighestSchema = z.number().int().min(STREAK_MIN);
export const StreakCurrentSchema = z.number().int().min(STREAK_MIN);
export const StreakLastResponseTimeSchema = z.date();

export const streakSchema = z.object({
  highest: StreakHighestSchema,
  current: StreakCurrentSchema,
  lastResponseTime: StreakLastResponseTimeSchema,
});

export const CoreHighestSchema = z.number().int().min(CORE_MIN).max(CORE_MAX);
export const CoreCurrentSchema = z.number().int().min(CORE_MIN).max(CORE_MAX);

export const CoreSchema = z.object({
  highest: CoreHighestSchema,
  current: CoreCurrentSchema,
});
