import { z } from "zod";
import {
  USERNAME_MIN,
  USERNAME_MAX,
  NICKNAME_MIN,
  NICKNAME_MAX,
  BIO_MAX,
  INTERESTS_MAX,
  STREAK_MIN,
  CORE_MIN,
  CORE_MAX,
  LINK_MIN,
  LINK_MAX,
  INTEREST_ENUM,
  LINKS_MAX,
  INTERESTS_MIN,
  AVATAR_MAX_SIZE,
  USER_BOOSTER_MIN,
  USER_BOOSTER_MAX,
  USER_BADGES,
  type Badge,
} from "@inquestia/constants";
import { IDSchema, ImplicitEmailSchema } from "./common.schemas";

export const AvatarTypeSchema = z
  .string()
  .refine((file) => file.startsWith("image/"), {
    message: `Invalid avatar`,
  });

export const AvatarSizeSchema = z
  .number()
  .max(AVATAR_MAX_SIZE, `File too large`);
// max size

export const UsernameSchema = z
  .string()
  .min(USERNAME_MIN, `Username must be at least ${USERNAME_MIN} characters`)
  .max(USERNAME_MAX, `Username must be at most ${USERNAME_MAX} characters `)
  .regex(
    /^[a-z0-9_]+$/,
    `Username may only contain lowercase letters, numbers, and underscores`
  );

export const NicknameSchema = z
  .string()
  .min(NICKNAME_MIN, `Nickname must be at least ${NICKNAME_MIN} characters `)
  .max(NICKNAME_MAX, `Nickname must be at least ${NICKNAME_MAX} characters`)
  .regex(
    /^[a-zA-Z0-9 _.-]+$/,
    `Only letters, numbers, spaces, underscores, dots, and hyphens are allowed`
  );

export const AvatarSchema = z.string();
export const BioSchema = z
  .string()
  .max(BIO_MAX, `Bio must be at most ${BIO_MAX} characters`);
export const IsFinishedOnboardingSchema = z.boolean();
export const BoosterPointSchema = z
  .number()
  .int()
  .min(
    USER_BOOSTER_MIN,
    `You can only have ${USER_BOOSTER_MIN}-${USER_BOOSTER_MAX} points`
  )
  .max(
    USER_BOOSTER_MAX,
    `You can only have ${USER_BOOSTER_MIN}-${USER_BOOSTER_MAX} points`
  );

export const InterestSchema = z.enum(INTEREST_ENUM, `Invalid interest`);

export const InterestListSchema = z
  .array(InterestSchema)
  .min(
    INTERESTS_MIN,
    `You can only select ${INTERESTS_MIN}-${INTERESTS_MAX} interests`
  )
  .max(
    INTERESTS_MAX,
    `You can only select ${INTERESTS_MIN}-${INTERESTS_MAX} interests`
  );

export const SocialLinkSchema = z
  .string()
  .url(`Invalid URL format`)
  .min(LINK_MIN, `Invalid URL format`)
  .max(LINK_MAX, `Invalid URL format`);

export const SocialLinkListSchema = z.array(SocialLinkSchema).max(LINKS_MAX);
export const StreakHighestSchema = z.number().int().min(STREAK_MIN);
export const StreakCurrentSchema = z.number().int().min(STREAK_MIN);
export const StreakLastResponseTimeSchema = z.date();

export const StreakSchema = z
  .object({
    highest: StreakHighestSchema,
    current: StreakCurrentSchema,
    lastResponseTime: StreakLastResponseTimeSchema,
  })
  .strip();

export const CoreHighestSchema = z.number().int().min(CORE_MIN).max(CORE_MAX);
export const CoreCurrentSchema = z.number().int().min(CORE_MIN).max(CORE_MAX);

export const CoreSchema = z
  .object({
    highest: CoreHighestSchema,
    current: CoreCurrentSchema,
  })
  .strip();

export const UserSchema = z
  .object({
    username: UsernameSchema,
    _id: IDSchema,
    nickname: NicknameSchema.optional().nullable(),
    avatar: AvatarSchema,
    bio: BioSchema.catch(""),
    core: CoreSchema.optional().catch({ highest: 1, current: 1 }),
    socialLinks: SocialLinkListSchema.optional().default([]),
    streak: StreakSchema.optional().catch({
      highest: 1,
      current: 1,
      lastResponseTime: new Date(),
    }),
    boosterPoint: BoosterPointSchema.optional().catch(0),
    interests: InterestListSchema,
    badge: z
      .object({
        pointsRequired: z.number(),
        style: z.string(),
        badge: z.string(),
      })
      .strip()
      .optional(),
  })
  .strip()
  .transform((v) =>
    v.core
      ? {
          ...v,
          badge:
            USER_BADGES.toReversed().find(
              (b) => b.pointsRequired <= (v.core?.current ?? 0)
            ) ?? (USER_BADGES[0] as Badge),
        }
      : v
  );

export const UserWithCredentialSchema = UserSchema.and(
  z.object({
    credential: z
      .object({
        email: ImplicitEmailSchema,
      })
      .strip(),
  })
);

export type UserWithCredential = z.infer<typeof UserWithCredentialSchema>;

export type User = z.infer<typeof UserSchema>;
