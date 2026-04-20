// server.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// src/config/connectDatabase.ts
import mongoose from "mongoose";

// src/config/env.ts
import dotenv from "dotenv";

// src/config/logger.ts
import winston from "winston";
var isProd = process.env.NODE_ENV === "production";
var logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: isProd ? [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ] : [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});
var logger_default = logger;

// src/config/env.ts
dotenv.config({ quiet: true });
var getEnvVar = (key) => {
  const value = process.env[key];
  if (!value) {
    logger_default.error(`Missing Env ${key}`);
    process.exit(1);
  }
  return value;
};
var requiredVars = [
  "PORT",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "GROQ_API_KEY",
  "WEB_ORIGIN",
  "MONGODB_KEY",
  "MONGODB_DEV_KEY",
  "REFRESH_TOKEN_TTL",
  "NODE_ENV",
  "SALT_ROUNDS",
  "ACCESS_TOKEN_TTL",
  "OAUTH_CLIENT_ID",
  "OAUTH_CLIENT_SECRET",
  "OAUTH_REFRESH_TOKEN"
];
requiredVars.forEach(getEnvVar);
var ENV_CONFIG = {
  PORT: getEnvVar("PORT"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnvVar("CLOUDINARY_API_SECRET"),
  GROQ_API_KEY: getEnvVar("GROQ_API_KEY"),
  WEB_ORIGIN: getEnvVar("WEB_ORIGIN"),
  MONGODB_KEY: getEnvVar("MONGODB_KEY"),
  MONGODB_DEV_KEY: getEnvVar("MONGODB_DEV_KEY"),
  REFRESH_TOKEN_TTL: getEnvVar("REFRESH_TOKEN_TTL"),
  NODE_ENV: getEnvVar("NODE_ENV"),
  SALT_ROUNDS: Number(getEnvVar("SALT_ROUNDS")),
  ACCESS_TOKEN_TTL: getEnvVar("ACCESS_TOKEN_TTL"),
  OAUTH_CLIENT_ID: getEnvVar("OAUTH_CLIENT_ID"),
  OAUTH_CLIENT_SECRET: getEnvVar("OAUTH_CLIENT_SECRET"),
  OAUTH_REFRESH_TOKEN: getEnvVar("OAUTH_REFRESH_TOKEN")
};

// src/config/connectDatabase.ts
var connectDatabase = async () => {
  try {
    const isProd2 = process.env.NODE_ENV === "production";
    const connectionString = isProd2 ? ENV_CONFIG.MONGODB_KEY : ENV_CONFIG.MONGODB_DEV_KEY;
    if (!connectionString) {
      logger_default.error("DB Connection String is missing.", new Error("Database connection failed"));
    }
    const connection = await mongoose.connect(ENV_CONFIG.MONGODB_KEY);
    logger_default.info(`Mongo DB Connected ${isProd2 ? "on Prod" : "on Dev"}`);
    return connection;
  } catch (e) {
    logger_default.error(e);
    process.exit(1);
  }
};

// src/router/main.router.ts
import { Router as Router6 } from "express";

// ../../packages/constants/user.constants.ts
var USERNAME_MIN = 6;
var USERNAME_MAX = 24;
var USERNAME_REGEX = /^[a-z0-9_]+$/;
var USERNAME_MSG = {
  min: `Username must be at least ${USERNAME_MIN} characters.`,
  max: `Username must be at most ${USERNAME_MAX} characters.`,
  pattern: "Username may only contain lowercase letters, numbers, and underscores"
};
var NICKNAME_MIN = 2;
var NICKNAME_MAX = 32;
var NICKNAME_REGEX = /^[a-zA-Z0-9 _.-]+$/;
var NICKNAME_MSG = {
  min: `Nickname must be at least ${NICKNAME_MIN} characters.`,
  max: `Nickname must be at most ${NICKNAME_MAX} characters`,
  pattern: "Nickname contains invalid characters"
};
var BIO_MAX = 100;
var BIO_MSG = {
  max: `Bio must be ${BIO_MAX} characters or less`
};
var INTERESTS_MAX = 10;
var INTERESTS_MIN = 1;
var INTERESTS_MSG = {
  range: `You can only have ${INTERESTS_MIN}-${INTERESTS_MAX} interests.`,
  invalid: "Invalid Interest."
};
var STREAK_MIN = 1;
var STREAK_MSG = {
  min: `Streak must be at least ${STREAK_MIN}`
};
var CORE_MIN = 0;
var CORE_MAX = 1e5;
var BOOSTER_MIN = 0;
var BOOSTER_MAX = 100;
var BOOSTER_MSG = {
  min: "Booster points cannot be negative",
  max: `Booster points cannot exceed ${BOOSTER_MAX}`
};
var LINKS_MAX = 6;
var LINK_MIN = 6;
var LINK_MAX = 46;
var LINK_MSG = {
  min: "Link is too short",
  max: "Link is too long",
  invalid: "Invalid URL format"
};
var BAN_MIN_DAYS = 1;
var BAN_MAX_DAYS = 3650;
var BAN_MSG = {
  min: `Ban duration must be at least ${BAN_MIN_DAYS} day`,
  max: `Ban duration cannot exceed ${BAN_MAX_DAYS} years`
};
var MAX_MB = 20;
var AVATAR_MAX_SIZE = MAX_MB * 1024 * 1024;
var AVATAR_MSG = {
  url: "Avatar must be a valid URL",
  size: `File too large. Max (${MAX_MB}MB)`,
  type: "File type must be an image."
};
var INTEREST_ENUM = [
  "adventure",
  "animals",
  "art",
  "architecture",
  "artificial intelligence",
  "astronomy",
  "board games",
  "blockchain",
  "card games",
  "cars",
  "cinema",
  "climate change",
  "cooking",
  "culture",
  "cybersecurity",
  "data science",
  "dance",
  "debate",
  "design",
  "drawing",
  "education",
  "environment",
  "e-sports",
  "engineering",
  "entrepreneurship",
  "fashion",
  "finance",
  "food",
  "gaming",
  "gardening",
  "health",
  "history",
  "law",
  "literature",
  "machine learning",
  "marketing",
  "mathematics",
  "meditation",
  "mobile development",
  "mindfulness",
  "mythology",
  "music",
  "nature",
  "ocean",
  "parenting",
  "photography",
  "photography editing",
  "personal",
  "philosophy",
  "podcasting",
  "politics",
  "programming",
  "psychology",
  "relationships",
  "robotics",
  "self-improvement",
  "space exploration",
  "sports",
  "startups",
  "sustainability",
  "technology",
  "theater",
  "travel",
  "travel blogging",
  "vlogging",
  "volunteering",
  "web development",
  "wine",
  "writing",
  "yoga",
  "tea",
  "coffee",
  "DIY",
  "comedy",
  "painting",
  "sculpture",
  "motorcycles"
];
var USER_BADGES = [
  { badge: "Newbie", pointsRequired: 0, style: "text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-lg" },
  { badge: "Survey Starter", pointsRequired: 12e3, style: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded-lg" },
  { badge: "Curious Mind", pointsRequired: 24e3, style: "text-sky-600 bg-sky-50 dark:bg-sky-900/40 px-2 py-1 rounded-lg" },
  { badge: "Feedback Giver", pointsRequired: 36e3, style: "text-teal-600 bg-teal-50 dark:bg-teal-900/40 px-2 py-1 rounded-lg" },
  { badge: "Insight Seeker", pointsRequired: 48e3, style: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-1 rounded-lg" },
  { badge: "Active Participant", pointsRequired: 6e4, style: "text-lime-600 bg-lime-50 dark:bg-lime-900/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Enthusiast", pointsRequired: 72e3, style: "text-green-600 bg-green-50 dark:bg-green-900/40 px-2 py-1 rounded-lg" },
  { badge: "Opinion Collector", pointsRequired: 84e3, style: "text-amber-600 bg-amber-50 dark:bg-amber-900/40 px-2 py-1 rounded-lg" },
  { badge: "Community Helper", pointsRequired: 96e3, style: "text-orange-600 bg-orange-50 dark:bg-orange-900/40 px-2 py-1 rounded-lg" },
  { badge: "Rising Voice", pointsRequired: 108e3, style: "text-rose-600 bg-rose-50 dark:bg-rose-900/40 px-2 py-1 rounded-lg" },
  { badge: "Idea Contributor", pointsRequired: 12e4, style: "text-pink-600 bg-pink-50 dark:bg-pink-900/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Explorer", pointsRequired: 132e3, style: "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/40 px-2 py-1 rounded-lg" },
  { badge: "Insight Hunter", pointsRequired: 144e3, style: "text-purple-600 bg-purple-50 dark:bg-purple-900/40 px-2 py-1 rounded-lg" },
  { badge: "Engaged Participant", pointsRequired: 156e3, style: "text-violet-600 bg-violet-50 dark:bg-violet-900/40 px-2 py-1 rounded-lg" },
  { badge: "Data Enthusiast", pointsRequired: 168e3, style: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded-lg" },
  { badge: "Community Builder", pointsRequired: 18e4, style: "text-blue-700 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-950/40 px-2 py-1 rounded-lg" },
  { badge: "Feedback Leader", pointsRequired: 192e3, style: "text-cyan-600 bg-gradient-to-r from-cyan-50 to-sky-100 dark:from-cyan-900/40 dark:to-sky-950/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Strategist", pointsRequired: 204e3, style: "text-emerald-700 bg-gradient-to-r from-emerald-50 to-lime-100 dark:from-emerald-900/40 dark:to-lime-950/40 px-2 py-1 rounded-lg" },
  { badge: "Opinion Leader", pointsRequired: 216e3, style: "text-amber-700 bg-gradient-to-r from-amber-50 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-950/40 px-2 py-1 rounded-lg" },
  { badge: "Survey Mentor", pointsRequired: 228e3, style: "text-rose-700 bg-gradient-to-r from-rose-50 to-pink-100 dark:from-rose-900/40 dark:to-pink-950/40 px-2 py-1 rounded-lg" },
  { badge: "Insight Master", pointsRequired: 24e4, style: "text-fuchsia-700 bg-gradient-to-r from-fuchsia-50 to-purple-100 dark:from-fuchsia-900/40 dark:to-purple-950/40 px-2 py-1 rounded-lg shadow-[0_0_10px_rgba(200,100,255,0.3)]" },
  { badge: "Community Expert", pointsRequired: 252e3, style: "text-purple-700 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-950/40 px-2 py-1 rounded-lg shadow-[0_0_10px_rgba(180,120,255,0.4)]" },
  { badge: "Survey Visionary", pointsRequired: 264e3, style: "text-violet-700 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/40 dark:to-indigo-950/40 px-2 py-1 rounded-lg shadow-[0_0_12px_rgba(160,130,255,0.45)]" },
  { badge: "Insight Innovator", pointsRequired: 276e3, style: "text-indigo-700 bg-gradient-to-r from-indigo-100 to-sky-100 dark:from-indigo-900/40 dark:to-sky-950/40 px-2 py-1 rounded-lg shadow-[0_0_14px_rgba(140,150,255,0.5)]" },
  { badge: "Community Legend", pointsRequired: 288e3, style: "text-sky-700 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/40 dark:to-blue-950/40 px-2 py-1 rounded-lg shadow-[0_0_15px_rgba(130,180,255,0.55)]" },
  { badge: "Survey Titan", pointsRequired: 3e5, style: "text-blue-700 bg-gradient-to-r from-blue-100 to-fuchsia-100 dark:from-blue-900/40 dark:to-fuchsia-950/40 px-2 py-1 rounded-lg shadow-[0_0_16px_rgba(150,100,255,0.6)]" },
  { badge: "Insight Titan", pointsRequired: 315e3, style: "text-violet-700 bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/40 dark:to-fuchsia-950/40 px-2 py-1 rounded-lg shadow-[0_0_18px_rgba(170,90,255,0.65)]" },
  { badge: "Community Godfather", pointsRequired: 33e4, style: "text-fuchsia-600 bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/40 dark:to-pink-950/40 px-2 py-1 rounded-lg shadow-[0_0_20px_rgba(190,70,255,0.7)] animate-pulse" },
  { badge: "Research Deity", pointsRequired: 34e4, style: "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 font-bold shadow-[0_0_20px_rgba(150,90,255,0.8)] animate-pulse drop-shadow-lg" },
  { badge: "Survey Immortal", pointsRequired: 35e4, style: "text-violet-500 bbh-sans-bartle-regular rounded-xl dark:text-violet-300 dark:shadow-[0_0_15px_rgba(130,80,255,0.45)] shadow-[0_0_15px_rgba(167,139,250,0.6)] backdrop-brightness-200 animate-pulse px-2" }
];

// ../../packages/constants/credential.constants.ts
var ROLE_ENUM = ["admin", "user"];
var INVALID_CREDENTIALS_MSG = "Invalid Credentials";
var PASSWORD_MIN = 8;
var PASSWORD_MAX = 30;
var IMPLICIT_EMAIL_MSG = {
  invalid: INVALID_CREDENTIALS_MSG
};
var TOKEN_MSG = {
  invalid: "Invalid Token.",
  expired: "Token has expired"
};
var IMPLICIT_PASSWORD_MSG = {
  invalid: INVALID_CREDENTIALS_MSG,
  min: INVALID_CREDENTIALS_MSG,
  max: INVALID_CREDENTIALS_MSG
};
var EXPLICIT_EMAIL_MSG = {
  invalid: "Email must be a valid address (for example: name@example.com)."
};
var MUST_ACCEPT_PRIVACY_POLICY = true;
var MUST_ACCEPT_PRIVACY_POLICY_MSG = {
  invalid: "You must accept the Privacy Policy to continue."
};
var EXPLICIT_PASSWORD_MSG = {
  invalid: "Password must contain only letters and numbers.",
  min: `Password must be at least ${PASSWORD_MIN} characters.`,
  max: `Password must be at most ${PASSWORD_MIN} characters.`
};

// ../../packages/constants/survey.constants.ts
var TITLE_MIN = 12;
var TITLE_MAX = 1e3;
var TITLE_MSG = {
  min: `Survey title must be at least ${TITLE_MIN} characters.`,
  max: `Survey title must be at most ${TITLE_MAX} characters.`,
  range: `Survey title must be ${TITLE_MIN}-${TITLE_MAX} characters.`
};
var DESCRIPTION_MIN = 22;
var DESCRIPTION_MAX = 2500;
var DESCRIPTION_MSG = {
  min: `Survey description must be at least ${DESCRIPTION_MIN} characters.`,
  max: `Survey description must be at most ${DESCRIPTION_MAX} characters.`,
  range: `Survey description must be ${DESCRIPTION_MIN}-${DESCRIPTION_MAX} characters.`
};
var TARGET_RESPONDENTS_MIN = 8;
var TARGET_RESPONDENTS_MAX = 1e3;
var TARGET_RESPONDENTS_MSG = {
  min: `You must have at least ${TARGET_RESPONDENTS_MIN} target respondents`,
  max: `You must have at most ${TARGET_RESPONDENTS_MAX} target respondents`
};
var TOTAL_RESPONDENTS_MAX = TARGET_RESPONDENTS_MAX;
var TOTAL_RESPONDENTS_MSG = {
  max: `The target number of respondents have already been reached.`
};
var TAGS_ENUM = INTEREST_ENUM;
var TAGS_MIN = 1;
var TAGS_MAX = 6;
var TAGS_MSG = {
  range: `Your survey must contain ${TAGS_MIN}-${TAGS_MAX} tags`
};
var AUTHORIZED_VIEWERS_MAX = 12;
var AUTHORIZED_VIEWERS_MSG = {
  max: `You can only allow ${AUTHORIZED_VIEWERS_MAX} people to be a viewer`
};
var APPLIED_BOOSTER_MAX = 5;
var APPLIED_BOOSTER_MIN = 0;
var APPLIED_BOOSTER_MSG = {
  range: `You can only apply ${APPLIED_BOOSTER_MIN}-${APPLIED_BOOSTER_MAX} boosters.`
};

// ../../packages/constants/question.constants.ts
var QUESTION_TITLE_MIN = 6;
var QUESTION_TITLE_MAX = 250;
var QUESTION_TITLE_MSG = {
  min: `A survey question must be at least ${QUESTION_TITLE_MIN} characters.`,
  max: `A survey questoin must be at most ${QUESTION_TITLE_MAX} characters.`
};
var QUESTION_TYPE_ENUM = ["text", "select"];
var QUESTION_TYPE_MSG = {
  enum: `Your survey can only have ${QUESTION_TYPE_ENUM.join(", ")} survey types.`
};
var QUESTION_CHOICELIST_MIN = 2;
var QUESTION_CHOICELIST_MAX = 6;
var QUESTION_CHOICELIST_MSG = {
  range: `Your survey can only have ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} choices .`
};
var QUESTIONS_MAX = 20;
var QUESTIONS_MIN = 1;
var QUESTIONS_MSG = {
  range: `Survey must contain ${QUESTIONS_MIN}-${QUESTIONS_MAX} questions.`
};
var QUESTION_CHOICE_MIN = 1;
var QUESTION_CHOICE_MAX = 250;
var QUESTION_CHOICE_MSG = {
  min: `A choice must be at least ${QUESTION_CHOICE_MIN} character(s).`,
  max: `A choice must be at most ${QUESTION_CHOICE_MAX} characters.`
};

// ../../packages/constants/answer.constants.ts
var TEXT_ANSWER_MIN = 1;
var TEXT_ANSWER_MAX = 5e3;
var TEXT_ANSWER_MSG = {
  min: `An answer must be at least ${TEXT_ANSWER_MIN} characters.`,
  max: `An answer must be at least ${TEXT_ANSWER_MAX} characters.`
};
var SELECT_ANSWER_MIN = QUESTION_CHOICE_MIN;
var SELECT_ANSWER_MAX = QUESTION_CHOICE_MAX;
var SELECT_ANSWER_MSG = {
  range: `An answer must be ${SELECT_ANSWER_MIN}-${SELECT_ANSWER_MAX}`
};
var SELECT_ANSWER_LIST_MIN = 1;
var SELECT_ANSWER_LIST_MAX = QUESTION_CHOICELIST_MAX;
var SELECT_ANSWER_LIST_MSG = {
  range: `Your chosen answers must not be below ${SELECT_ANSWER_LIST_MIN} and exceed ${SELECT_ANSWER_LIST_MAX}`
};
var NUMBER_OF_ANSWERS_ALLOWED_MIN = 1;
var NUMBER_OF_ANSWERS_ALLOWED_MAX = QUESTION_CHOICELIST_MAX;
var NUMBER_OF_ANSWERS_ALLOWED_MSG = {
  range: `You can only choose answers from ${NUMBER_OF_ANSWERS_ALLOWED_MIN}-${NUMBER_OF_ANSWERS_ALLOWED_MAX} choices.`
};

// ../../packages/constants/assistant.constants.ts
var PROMPT_MAX = 2500;
var PROMPT_MIN = 1;
var PROMPT_MSG = {
  range: `Prompt must be ${PROMPT_MIN}-${PROMPT_MAX} characters.`
};

// ../../packages/utils/validators.ts
var isAlphanumeric = (u) => /^[a-z0-9]+$/i.test(u);
var isValidUrl = (u) => /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(u);
var isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// ../../packages/schemas/credential.schemas.ts
import z2 from "zod";

// ../../packages/schemas/user.schemas.ts
import { z } from "zod";
var BannedAtSchema = z.date();
var BanDurationSchema = z.number().int().min(BAN_MIN_DAYS, BAN_MSG.min).max(BAN_MAX_DAYS, BAN_MSG.max);
var AvatarTypeSchema = z.string().refine((file) => file.startsWith("image/"), {
  message: AVATAR_MSG.type
});
var AvatarSizeSchema = z.number().max(AVATAR_MAX_SIZE, AVATAR_MSG.size);
var UsernameSchema = z.string().min(USERNAME_MIN, USERNAME_MSG.min).max(USERNAME_MAX, USERNAME_MSG.max).regex(USERNAME_REGEX, USERNAME_MSG.pattern);
var NicknameSchema = z.string().min(NICKNAME_MIN, NICKNAME_MSG.min).max(NICKNAME_MAX, NICKNAME_MSG.max).regex(NICKNAME_REGEX, NICKNAME_MSG.pattern);
var AvatarSchema = z.string();
var BioSchema = z.string().max(BIO_MAX, BIO_MSG.max);
var IsFinishedOnboardingSchema = z.boolean();
var BoosterPointSchema = z.number().int().min(BOOSTER_MIN, BOOSTER_MSG.min).max(BOOSTER_MAX, BOOSTER_MSG.max);
var InterestSchema = z.enum(INTEREST_ENUM, INTERESTS_MSG.invalid);
var InterestListSchema = z.array(InterestSchema).min(INTERESTS_MIN, INTERESTS_MSG.range).max(INTERESTS_MAX, INTERESTS_MSG.range);
var SocialLinkSchema = z.string().url(LINK_MSG.invalid).min(LINK_MIN, LINK_MSG.min).max(LINK_MAX, LINK_MSG.max);
var SocialLinkListSchema = z.array(SocialLinkSchema).max(LINKS_MAX);
var StreakHighestSchema = z.number().int().min(STREAK_MIN);
var StreakCurrentSchema = z.number().int().min(STREAK_MIN);
var StreakLastResponseTimeSchema = z.date();
var streakSchema = z.object({
  highest: StreakHighestSchema,
  current: StreakCurrentSchema,
  lastResponseTime: StreakLastResponseTimeSchema
});
var CoreHighestSchema = z.number().int().min(CORE_MIN).max(CORE_MAX);
var CoreCurrentSchema = z.number().int().min(CORE_MIN).max(CORE_MAX);
var CoreSchema = z.object({
  highest: CoreHighestSchema,
  current: CoreCurrentSchema
});

// ../../packages/schemas/credential.schemas.ts
var ExplicitEmailSchema = z2.string().email(EXPLICIT_EMAIL_MSG.invalid).trim();
var ImplicitEmailSchema = z2.string().email(IMPLICIT_EMAIL_MSG.invalid).trim();
var ExplicitPasswordSchema = z2.string().min(PASSWORD_MIN, EXPLICIT_PASSWORD_MSG.min).max(PASSWORD_MAX, EXPLICIT_PASSWORD_MSG.max).refine(isAlphanumeric, EXPLICIT_PASSWORD_MSG.invalid).trim();
var ImplicitPasswordSchema = z2.string().min(PASSWORD_MIN, IMPLICIT_PASSWORD_MSG.min).max(PASSWORD_MAX, IMPLICIT_PASSWORD_MSG.max).refine(isAlphanumeric, IMPLICIT_PASSWORD_MSG.invalid).trim();
var LoginFormSchema = z2.object({
  email: ImplicitEmailSchema,
  password: ImplicitPasswordSchema
});
var RegisterFormSchema = z2.object({
  username: UsernameSchema,
  email: ExplicitEmailSchema,
  password: ExplicitPasswordSchema,
  hasAcceptedPrivacyPolicy: z2.literal(
    MUST_ACCEPT_PRIVACY_POLICY,
    MUST_ACCEPT_PRIVACY_POLICY_MSG.invalid
  )
});
var UpdatePasswordFormSchema = z2.object({
  newPassword: ExplicitPasswordSchema,
  confirmPassword: ExplicitPasswordSchema
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  "Passwords do not match."
);
var CodeSchema = z2.string().min(6).max(6);

// ../../packages/schemas/question.schemas.ts
import z3 from "zod";
var QuestionTitleSchema = z3.string().min(QUESTION_TITLE_MIN, QUESTION_TITLE_MSG.min).max(QUESTION_TITLE_MAX, QUESTION_TITLE_MSG.max);
var QuestionTypeSchema = z3.enum(
  QUESTION_TYPE_ENUM,
  QUESTION_TYPE_MSG.enum
);
var QuestionChoiceSchema = z3.string().min(QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min).max(QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max);
var QuestionChoiceListSchema = z3.array(QuestionChoiceSchema).min(QUESTION_CHOICELIST_MIN, QUESTION_CHOICELIST_MSG.range).max(QUESTION_CHOICELIST_MAX, QUESTION_CHOICELIST_MSG.range);
var BaseQuestionSchema = {
  question: QuestionTitleSchema,
  _id: z3.string().optional().nullable(),
  isRequired: z3.boolean()
};
var OpenEndedQuestionSchema = z3.object({
  ...BaseQuestionSchema,
  type: z3.literal("text")
});
var CloseEndedQuestionSchema = z3.object({
  ...BaseQuestionSchema,
  choices: QuestionChoiceListSchema,
  numberOfAnswersAllowed: z3.number().min(QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min).max(QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max),
  type: z3.literal("select")
}).refine((val) => val.numberOfAnswersAllowed <= val.choices.length, {
  message: "numberOfAnswersAllowed must be less than or equal to the number of choices"
});
var QuestionsSchema = z3.array(
  z3.discriminatedUnion("type", [
    OpenEndedQuestionSchema,
    CloseEndedQuestionSchema
  ])
);

// ../../packages/schemas/queryParam.ts
import z4 from "zod";
var Sort = z4.preprocess(
  (val) => isNaN(Number(val)) ? val : Number(val),
  z4.union([
    z4.literal(1),
    z4.literal(-1),
    z4.literal("asc"),
    z4.literal("ascending"),
    z4.literal("desc"),
    z4.literal("descending")
  ])
).catch("descending");
var Limit = z4.preprocess(
  (l) => Number(l),
  z4.number().positive().int().catch(5)
);
var Page = z4.preprocess(
  (p) => Number(p),
  z4.number().positive().int().catch(1)
);
var QueryParamParser = z4.object({
  sort: Sort,
  limit: Limit,
  page: Page
}).transform((data) => ({
  ...data,
  skip: (data.page - 1) * data.limit
}));

// ../../packages/schemas/answer.schemas.ts
import z5 from "zod";
var OpenEndedAnswerSchema = z5.object({
  questionId: z5.string(),
  type: z5.literal("text"),
  answer: z5.string().min(TEXT_ANSWER_MIN, TEXT_ANSWER_MSG.min).max(TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max)
});
var CloseEndedAnswerSchema = z5.object({
  questionId: z5.string(),
  type: z5.literal("select"),
  numberOfAnswersAllowed: z5.number().min(SELECT_ANSWER_LIST_MIN, SELECT_ANSWER_LIST_MSG.range).max(SELECT_ANSWER_LIST_MAX, SELECT_ANSWER_LIST_MSG.range),
  answers: z5.array(
    z5.string().min(SELECT_ANSWER_MIN, SELECT_ANSWER_MSG.range).max(SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range)
  )
});
var OpenEndedAnswerFilterSchema = OpenEndedAnswerSchema.extend({
  answer: z5.string().max(TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max)
});
var CloseEndedAnswerFilterSchema = CloseEndedAnswerSchema.extend({
  answers: z5.array(z5.string().max(SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range))
});
var AnswerFormSchema = z5.object({
  isAnonymous: z5.boolean(),
  responses: z5.array(
    z5.discriminatedUnion("type", [OpenEndedAnswerSchema, CloseEndedAnswerSchema])
  )
});
var AnswerFilterSchema = AnswerFormSchema.extend({
  isAuthentic: z5.boolean().nullable().catch(null),
  surveyId: z5.string(),
  isAnonymous: z5.boolean().nullable().catch(null),
  responses: z5.array(
    z5.discriminatedUnion("type", [OpenEndedAnswerFilterSchema, CloseEndedAnswerFilterSchema])
  )
});
var IsAuthenticParamSchema = z5.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return null;
}, z5.boolean().nullable().catch(null));

// ../../packages/schemas/assistant.schemas.ts
import z6 from "zod";
var PromptSchema = z6.string().min(PROMPT_MIN, PROMPT_MSG.range).max(PROMPT_MAX, PROMPT_MSG.range);

// ../../packages/schemas/survey.schemas.ts
import { z as z7 } from "zod";
var TagSchema = z7.enum(TAGS_ENUM);
var TitleSchema = z7.string().min(TITLE_MIN, TITLE_MSG.min).max(TITLE_MAX, TITLE_MSG.max);
var DescriptionSchema = z7.string().min(DESCRIPTION_MIN, DESCRIPTION_MSG.min).max(DESCRIPTION_MAX, DESCRIPTION_MSG.max);
var TargetRespondentsSchema = z7.number().int().min(TARGET_RESPONDENTS_MIN, TARGET_RESPONDENTS_MSG.min).max(TARGET_RESPONDENTS_MAX, TARGET_RESPONDENTS_MSG.max);
var TotalRespondentsSchema = z7.number().int().max(TOTAL_RESPONDENTS_MAX, TOTAL_RESPONDENTS_MSG.max);
var TagsSchema = z7.array(TagSchema).min(TAGS_MIN, TAGS_MSG.range).max(TAGS_MAX, TAGS_MSG.range);
var AuthorizedViewersSchema = z7.array(z7.string()).max(AUTHORIZED_VIEWERS_MAX, AUTHORIZED_VIEWERS_MSG.max);
var IsDraftSchema = z7.preprocess((val) => val === "true", z7.boolean());
var AppliedBoostersSchema = z7.number().int().min(APPLIED_BOOSTER_MIN, APPLIED_BOOSTER_MSG.range).max(APPLIED_BOOSTER_MAX, APPLIED_BOOSTER_MSG.range);
var SurveyFormSchema = z7.object({
  title: TitleSchema,
  description: DescriptionSchema,
  targetRespondents: TargetRespondentsSchema,
  booster: AppliedBoostersSchema,
  tags: TagsSchema,
  questions: QuestionsSchema,
  isDraft: z7.boolean(),
  _id: z7.string().optional()
});

// src/controllers/auth.controller.ts
import jwt from "jsonwebtoken";

// src/constants/auth.constants.ts
import ms from "ms";
var REFRESH_TTL = ENV_CONFIG.REFRESH_TOKEN_TTL;
var ACCESS_TTL = ENV_CONFIG.ACCESS_TOKEN_TTL;
var REFRESH_TOKEN_COOKIE_TTL = ms(REFRESH_TTL);
var REFRESH_TOKEN_JWT_TTL = REFRESH_TTL;
var ACCESS_TOKEN_JWT_TTL = ACCESS_TTL;
var VERIFICATION_CODE_TTL = ms("10m");

// src/utils/getNextPage.ts
var getNextPage = ({
  page,
  limit,
  totalResources
}) => {
  const nextPage = page * limit < totalResources ? page + 1 : null;
  return nextPage;
};

// src/helper/entity.helper.ts
var EntityHelper = class {
  constructor(Entity) {
    this.Entity = Entity;
  }
  getListOfResource = async ({
    filterQuery,
    query,
    page,
    limit
  }) => {
    const [resourceList, totalResources] = await Promise.all([
      query,
      this.Entity.countDocuments(filterQuery)
    ]);
    const nextPage = getNextPage({ page, limit, totalResources });
    return {
      resourceList,
      totalResources,
      nextPage
    };
  };
};

// src/models/user/credential.ts
import mongoose2 from "mongoose";
import bcrypt from "bcryptjs";
var credentialSchema = new mongoose2.Schema({
  role: {
    type: String,
    default: "user",
    enum: ROLE_ENUM,
    required: true
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: isValidEmail,
      message: IMPLICIT_EMAIL_MSG.invalid
    }
  },
  password: {
    required: true,
    type: String
  },
  userId: {
    type: mongoose2.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
credentialSchema.methods.comparePasswords = async function(candidatePass) {
  return await bcrypt.compare(candidatePass, this.password);
};
var Credential = mongoose2.model(
  "Credential",
  credentialSchema
);
var credential_default = Credential;

// src/models/user/user.ts
import mongoose3 from "mongoose";
var userSchema = new mongoose3.Schema(
  {
    bannedAt: {
      type: Date,
      default: null
    },
    banDuration: {
      type: Number,
      default: null
    },
    streak: {
      highest: {
        type: Number,
        default: STREAK_MIN,
        index: true
      },
      lastResponseTime: {
        type: Date,
        default: () => /* @__PURE__ */ new Date()
      },
      current: {
        type: Number,
        default: STREAK_MIN,
        index: true
      }
    },
    username: {
      type: String,
      unique: true,
      minlength: [USERNAME_MIN, USERNAME_MSG.min],
      maxlength: [USERNAME_MAX, USERNAME_MSG.max],
      lowercase: true,
      validate: {
        validator: (val) => USERNAME_REGEX.test(val),
        message: USERNAME_MSG.pattern
      },
      index: true
    },
    avatar_public_id: {
      type: String,
      default: null
    },
    nickname: {
      minlength: [NICKNAME_MIN, NICKNAME_MSG.min],
      maxlength: [NICKNAME_MAX, NICKNAME_MSG.max],
      type: String,
      validate: {
        validator: (val) => NICKNAME_REGEX.test(val),
        message: NICKNAME_MSG.pattern
      },
      index: true,
      default: null
    },
    avatar: {
      type: String
    },
    bio: {
      type: String,
      maxlength: [BIO_MAX, BIO_MSG.max],
      default: null
    },
    interests: {
      type: [String],
      enum: INTEREST_ENUM,
      default: ["personal"],
      validate: {
        validator: (v) => v.length >= INTERESTS_MIN && v.length <= INTERESTS_MAX,
        message: INTERESTS_MSG.range
      }
    },
    lastUsernameUpdate: {
      type: Date,
      default: () => /* @__PURE__ */ new Date()
    },
    core: {
      highest: {
        type: Number,
        default: CORE_MIN,
        index: true
      },
      current: {
        type: Number,
        default: CORE_MIN,
        index: true
      }
    },
    socialLinks: [
      {
        type: String,
        validate: {
          validator: isValidUrl,
          message: LINK_MSG.invalid
        },
        minlength: [LINK_MIN, LINK_MSG.min],
        maxlength: [LINK_MAX, LINK_MSG.max]
      }
    ],
    isFinishedOnboarding: {
      type: Boolean,
      default: false
    },
    boosterPoint: {
      type: Number,
      default: BOOSTER_MIN,
      min: [BOOSTER_MIN, BOOSTER_MSG.min],
      max: [BOOSTER_MAX, BOOSTER_MSG.max]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);
userSchema.virtual("banDetails").get(function() {
  const data = { isBanned: false, remainingMS: 0 };
  if (!this.bannedAt || !this.banDuration) return data;
  const bannedFor = Date.now() - new Date(this.bannedAt).getTime();
  data.isBanned = bannedFor < this.banDuration;
  data.remainingMS = this.banDuration - bannedFor;
  return data;
});
userSchema.virtual("badge").get(function() {
  const badges = USER_BADGES.sort((a, b) => b.pointsRequired - a.pointsRequired);
  const badge = badges.find((b) => (this.core?.current ?? 0) >= b.pointsRequired);
  return badge;
});
userSchema.virtual("displayName").get(function() {
  const displayName = this.nickname ?? this.username;
  return displayName;
});
userSchema.methods.getSafeDetails = function() {
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
    socialLinks: this.socialLinks
  };
  return safeDetails;
};
var User = mongoose3.model("User", userSchema);
var user_default = User;

// src/helper/auth.helper.ts
import bcrypt2 from "bcryptjs";
var AuthHelper = class {
  constructor() {
  }
  doesIdentifiersExist = async ({ email, username }) => {
    const [isThisEmailAlreadyUsed, isThisUsernameAlreadyUsed] = await Promise.all([
      credential_default.exists({ email }),
      user_default.exists({ username })
    ]);
    return {
      doesEmailExist: isThisEmailAlreadyUsed,
      doesUsernameExist: isThisUsernameAlreadyUsed
    };
  };
  hash = async (pass) => {
    const hashed = await bcrypt2.hash(pass.trim(), ENV_CONFIG.SALT_ROUNDS);
    return hashed;
  };
};

// src/utils/customErrorClass.ts
var CustomError = class extends Error {
  constructor(statusCode, message, code) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.code = code;
  }
};
var UnauthorizedError = class extends CustomError {
  constructor(message, code) {
    super(401, message, code);
  }
};
var ConflictError = class extends CustomError {
  constructor(message, code) {
    super(409, message, code);
  }
};
var NotFoundError = class extends CustomError {
  constructor(message, code) {
    super(404, message, code);
  }
};
var ForbiddenError = class extends CustomError {
  constructor(message, code) {
    super(403, message, code);
  }
};
var BadRequestError = class extends CustomError {
  constructor(message, code) {
    super(400, message, code);
  }
};

// src/helper/answer.helper.ts
import mongoose4 from "mongoose";
var AnswerHelper = class {
  generateAnswerFilterPipeline = (filter) => {
    const generateMainPipeline = () => {
      const pipeline = [
        {
          $match: {
            surveyId: new mongoose4.Types.ObjectId(filter.surveyId)
          }
        }
      ];
      if (filter.isAuthentic !== null) {
        pipeline.push({
          $match: {
            isAuthentic: filter.isAuthentic
          }
        });
      }
      if (filter.isAnonymous !== null) {
        pipeline.push({
          $match: {
            isAnonymous: filter.isAnonymous
          }
        });
      }
      for (const f of filter.responses) {
        const questionId = new mongoose4.Types.ObjectId(f.questionId);
        if (f.type === "text" && f.answer.trim() !== "") {
          ``;
          pipeline.push({
            $match: {
              responses: {
                $elemMatch: {
                  questionId,
                  type: "text",
                  answer: { $regex: f.answer, $options: "i" }
                }
              }
            }
          });
        }
        if (f.type === "select" && f.answers.length > 0) {
          pipeline.push({
            $match: {
              $expr: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$responses",
                        as: "response",
                        cond: {
                          $and: [
                            { $eq: ["$$response.questionId", questionId] },
                            { $setIsSubset: [f.answers, "$$response.answers"] }
                          ]
                        }
                      }
                    }
                  },
                  0
                ]
              }
            }
          });
        }
      }
      return pipeline;
    };
    const pip = generateMainPipeline();
    return pip;
  };
  validateAnswerForm = ({
    myId,
    survey,
    answerForm
  }) => {
    if (myId === String(survey.authorId)) {
      throw new BadRequestError(
        "You can't be your own respondent.",
        "AUTHOR_RESPONDENT_CONFLICT"
      );
    }
    if (survey.respondents.some((id) => String(id) === myId)) {
      throw new BadRequestError(
        "You have already submitted an answer to this survey.",
        "DUPLICATE_ANSWER_SUBMISSION"
      );
    }
    for (const q of survey.questions) {
      if (!q.isRequired) {
        continue;
      }
      const questionAnswer = answerForm.responses.find(
        ({ questionId }) => questionId === String(q._id)
      );
      if (!questionAnswer) {
        throw new BadRequestError(
          `Missing answer on question ${q._id}`,
          "MISSING_ANSWER"
        );
      }
      if (questionAnswer.type === "text" && questionAnswer.answer.trim() === "") {
        throw new BadRequestError(
          `Missing answer on question ${q._id}`,
          "MISSING_ANSWER"
        );
      }
      if (questionAnswer.type === "select" && questionAnswer.answers.length === 0) {
        throw new BadRequestError(
          `Missing answer on question ${q._id}`,
          "MISSING_ANSWER"
        );
      }
    }
    if (!survey.questions.every(
      (q) => answerForm.responses.some(
        ({ questionId }) => String(q._id) === questionId
      )
    )) {
      throw new BadRequestError("Unknown question ID.", "UNKNOWN_QUESTION_ID");
    }
  };
  reformatSurveyAnswer = (answer) => {
    const questions = answer.survey.questions.map((q) => {
      const ans = answer.responses.find(
        (r) => String(r.questionId) === String(q._id)
      ) ?? {
        type: "text",
        questionId: "",
        answer: ""
      };
      if (ans.type === "select" && q.type === "select") {
        return {
          question: q.question,
          isRequired: q.isRequired,
          questionId: ans.questionId,
          type: ans.type,
          answers: ans.answers,
          choices: q.choices
        };
      }
      if (ans.type === "text" && q.type === "text") {
        return {
          question: q.question,
          isRequired: q.isRequired,
          questionId: ans.questionId,
          type: ans.type,
          answer: ans.answer
        };
      }
    });
    const base = {
      title: answer.survey.title,
      isAuthentic: answer.isAuthentic,
      description: answer.survey.description,
      respondentId: typeof answer.respondentId === "string" ? answer.respondentId : answer.respondentId._id,
      respondent: new user_default(answer.respondent).getSafeDetails(),
      questions,
      survey: {
        ...answer.survey,
        author: !answer.survey.author ? null : new user_default(answer.survey.author).getSafeDetails(),
        authorId: typeof answer.survey.authorId === "string" ? answer.survey.authorId : answer.survey.authorId._id
      },
      _id: answer._id
    };
    return base;
  };
};

// src/models/answer/answer.ts
import mongoose6 from "mongoose";

// src/models/answer/answerType.ts
import mongoose5 from "mongoose";
var baseAnswerSchema = new mongoose5.Schema({
  type: {
    type: String,
    required: true
  },
  questionId: {
    type: mongoose5.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  }
}, {
  discriminatorKey: "type",
  _id: false
});
var textTypeAnswerSchema = baseAnswerSchema.discriminator("text", new mongoose5.Schema({
  answer: {
    type: String,
    minlength: [TEXT_ANSWER_MIN, TEXT_ANSWER_MSG.min],
    maxlength: [TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max],
    default: ""
  }
}));
var selectTypeAnswerSchema = baseAnswerSchema.discriminator("select", new mongoose5.Schema({
  answers: {
    type: [{
      type: String,
      minlength: [SELECT_ANSWER_MIN, SELECT_ANSWER_MSG.range],
      maxlength: [SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range]
    }],
    validate: {
      validator: function(arr) {
        return arr.length <= SELECT_ANSWER_LIST_MAX && arr.length >= SELECT_ANSWER_LIST_MIN;
      },
      message: SELECT_ANSWER_LIST_MSG.range
    },
    default: []
  },
  numberOfAnswersAllowed: {
    type: Number,
    min: [NUMBER_OF_ANSWERS_ALLOWED_MIN, NUMBER_OF_ANSWERS_ALLOWED_MSG.range],
    max: [NUMBER_OF_ANSWERS_ALLOWED_MAX, NUMBER_OF_ANSWERS_ALLOWED_MSG.range],
    default: 1
  }
}));

// src/models/answer/answer.ts
var answerSchema = new mongoose6.Schema({
  surveyId: {
    type: mongoose6.Schema.Types.ObjectId,
    ref: "Survey",
    required: true
  },
  responses: [baseAnswerSchema],
  respondentId: {
    type: mongoose6.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  isAuthentic: {
    type: Boolean,
    default: false
  },
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, {
  collection: "answers",
  discriminatorKey: "answerType",
  _id: true,
  timestamps: true
});
answerSchema.methods.getSafeDetails = function() {
  return {
    _id: this._id,
    survey: this.surveyId,
    responses: this.responses,
    respondent: this.respondent,
    respondentId: typeof this.respondentId,
    //ids are automatically populated
    isAuthentic: this.isAuthentic
  };
};
var Answer = mongoose6.model("Answer", answerSchema);
var answer_default = Answer;

// src/models/survey/survey.ts
import mongoose9 from "mongoose";

// src/models/survey/question.ts
import mongoose8 from "mongoose";

// src/models/survey/selectTypeQuestion.ts
import mongoose7 from "mongoose";
var selectTypeQuestionSchema = new mongoose7.Schema(
  {
    numberOfAnswersAllowed: {
      type: Number,
      max: [QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max],
      min: [QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min],
      default: 1
    },
    choices: {
      type: [
        {
          type: String,
          minlength: [QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min],
          maxlength: [QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max]
        }
      ],
      validate: {
        validator: (cs) => cs.length >= QUESTION_CHOICELIST_MIN && cs.length <= QUESTION_CHOICELIST_MAX,
        message: QUESTION_CHOICELIST_MSG.range
      }
    }
  },
  { _id: false }
);

// src/models/survey/question.ts
var questionSchema = new mongoose8.Schema({
  question: {
    type: String,
    minlength: [QUESTION_TITLE_MIN, QUESTION_TITLE_MSG.min],
    maxlength: [QUESTION_TITLE_MAX, QUESTION_TITLE_MSG.max],
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: QUESTION_TYPE_ENUM,
      message: QUESTION_TYPE_MSG.enum
    }
  },
  isRequired: {
    type: Boolean,
    default: false
  }
}, {
  collection: "questions",
  discriminatorKey: "type",
  _id: true
});
questionSchema.discriminator("select", selectTypeQuestionSchema);
var question_default = questionSchema;

// src/models/survey/survey.ts
var surveySchema = new mongoose9.Schema(
  {
    title: {
      type: String,
      minlength: [TITLE_MIN, TITLE_MSG.min],
      maxlength: [TITLE_MAX, TITLE_MSG.max],
      required: true,
      index: true
    },
    description: {
      type: String,
      minlength: [DESCRIPTION_MIN, DESCRIPTION_MSG.min],
      index: true,
      maxlength: [DESCRIPTION_MAX, DESCRIPTION_MSG.max],
      required: true
    },
    targetRespondents: {
      type: Number,
      min: [TARGET_RESPONDENTS_MIN, TARGET_RESPONDENTS_MSG.min],
      max: [TARGET_RESPONDENTS_MAX, TARGET_RESPONDENTS_MSG.max],
      default: 12
    },
    hasReachedTargetRespondents: {
      type: Boolean,
      default: false,
      index: true
    },
    isClosed: {
      type: Boolean,
      default: false,
      index: true
    },
    tags: {
      type: [{ type: String, enum: TAGS_ENUM, index: true }],
      validate: {
        validator: (val) => val.length >= TAGS_MIN && val.length <= TAGS_MAX,
        message: TAGS_MSG.range
      },
      required: true
    },
    questions: {
      type: [question_default],
      validate: {
        validator: function(arr) {
          return arr.length <= QUESTIONS_MAX && arr.length >= QUESTIONS_MIN;
        },
        message: "Survey must contain 1-20 questions."
      }
    },
    authorId: {
      type: mongoose9.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true
    },
    respondents: [
      {
        type: mongoose9.Schema.Types.ObjectId,
        ref: "User",
        index: true
      }
    ],
    isDraft: {
      type: Boolean,
      default: false,
      index: true
    },
    authorizedViewers: {
      type: [
        { type: mongoose9.Schema.Types.ObjectId, ref: "User", index: true }
      ],
      default: [],
      validate: {
        validator: (val) => val.length <= AUTHORIZED_VIEWERS_MAX,
        message: AUTHORIZED_VIEWERS_MSG.max
      },
      index: true
    },
    isTakendown: {
      type: Boolean,
      default: false,
      index: true
    },
    booster: {
      type: Number,
      default: APPLIED_BOOSTER_MIN,
      min: APPLIED_BOOSTER_MIN,
      index: true,
      max: APPLIED_BOOSTER_MAX
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);
surveySchema.virtual("totalRespondents").get(function() {
  return this.respondents.length;
});
surveySchema.methods.getSafeDetails = function() {
  const safeDetails = {
    isClosed: this.isClosed,
    createdAt: this.createdAt,
    description: this.description,
    hasReachedTargetRespondents: this.hasReachedTargetRespondents,
    isDraft: this.isDraft,
    questions: this.questions,
    tags: this.tags,
    author: this.author ?? this.authorId,
    targetRespondents: this.targetRespondents,
    title: this.title,
    totalRespondents: this.totalRespondents,
    _id: this._id,
    authorizedViewers: this.authorizedViewers,
    booster: this.booster
  };
  return safeDetails;
};
var Survey = mongoose9.model("Survey", surveySchema);
var survey_default = Survey;

// src/utils/runWithSession.ts
import mongoose10 from "mongoose";
var runWithSession = async (fn) => {
  const session = await mongoose10.startSession();
  try {
    session.startTransaction();
    const res = await fn(session);
    await session.commitTransaction();
    return res;
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    session.endSession();
  }
};

// src/services/answer.service.ts
import mongoose11 from "mongoose";
var entityHelper = new EntityHelper(answer_default);
var answerHelper = new AnswerHelper();
var AnswerService = class {
  getSurveyAnswers = async ({
    myId,
    skip,
    limit,
    page,
    filterForm
  }) => {
    const pipeline = [
      ...answerHelper.generateAnswerFilterPipeline(filterForm),
      {
        $lookup: {
          from: "users",
          localField: "respondentId",
          foreignField: "_id",
          as: "respondent"
        }
      },
      {
        $lookup: {
          from: "surveys",
          localField: "surveyId",
          foreignField: "_id",
          as: "survey"
        }
      },
      { $unwind: { path: "$respondent" } },
      { $unwind: { path: "$survey" } },
      // <-- New lookup for survey.authorId
      {
        $lookup: {
          from: "users",
          localField: "survey.authorId",
          foreignField: "_id",
          as: "survey.author"
        }
      },
      { $unwind: { path: "$survey.author" } }
    ];
    const [answers, totalAnswers] = await Promise.all([
      answer_default.aggregate(pipeline).skip(skip).limit(limit).exec(),
      answer_default.aggregate(pipeline).count("total").exec()
    ]);
    const nextPage = getNextPage({ page, limit, totalResources: totalAnswers[0]?.total || 0 });
    return {
      answers: answers.map((ans) => answerHelper.reformatSurveyAnswer(ans)),
      totalAnswers,
      nextPage
    };
  };
  getMyAnswers = async ({
    myId,
    skip,
    page,
    limit
  }) => {
    const query = {
      respondentId: myId
    };
    const [answers, totalAnswers] = await Promise.all([
      answer_default.find(query).skip(skip).limit(limit).populate({
        path: "surveyId",
        model: "Survey",
        select: "questions title description _id authorId",
        options: { lean: true },
        populate: {
          path: "authorId",
          model: "User",
          select: "avatar username nickname _id"
        }
      }).lean(),
      answer_default.countDocuments(query)
      //client will provide the user for respondent field, no populate needed
    ]);
    const safeAnswers = answers.map((a) => ({
      ...new answer_default(a).getSafeDetails(),
      survey: {
        ...a.surveyId,
        authorId: a.surveyId.authorId._id,
        author: a.surveyId.authorId
      }
    }));
    const nextPage = getNextPage({ page, limit, totalResources: totalAnswers });
    return {
      answers: safeAnswers.map((ans) => answerHelper.reformatSurveyAnswer({ ...ans })),
      totalAnswers,
      nextPage
    };
  };
  submitAnswer = async ({
    myId,
    surveyId,
    answerForm
  }) => {
    const survey = await survey_default.findOne({
      _id: surveyId,
      isClosed: false,
      isDeleted: false,
      isTakendown: false
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    if (survey.respondents.map((r) => r.toString()).includes(myId)) {
      throw new BadRequestError("You have already submitted an answer to this survey.", "ANSWER_ALREADY_SUBMITTED");
    }
    const [author, respondent] = await Promise.all([
      user_default.findById(survey.authorId).orFail(new NotFoundError("Author not found.", "AUTHOR_NOT_FOUND")),
      user_default.findById(myId).orFail(new NotFoundError("User not found.", "USER_NOT_FOUND"))
    ]);
    answerHelper.validateAnswerForm({ myId, survey, answerForm });
    return await runWithSession(async (session) => {
      survey.respondents.push(new mongoose11.Types.ObjectId(myId));
      if (author.core) {
        author.core.current += 50;
        author.core.highest = Math.max(author.core.highest, author.core.current);
        await author.save({ session });
      }
      if (!answerForm.isAnonymous && respondent.core) {
        respondent.core.current += 50;
        respondent.core.highest = Math.max(respondent.core.highest, respondent.core.current);
        await respondent.save({ session });
      }
      await survey.save({ session });
      await new answer_default({
        ...answerForm,
        respondentId: answerForm.isAnonymous ? null : myId,
        surveyId
      }).save({ session });
    });
  };
  toggleIsAuthentic = async ({
    answerId,
    myId
  }) => {
    const answer = await answer_default.findById(answerId).orFail(new NotFoundError("Answer not found.", "ANSWER_NOT_FOUND"));
    await survey_default.exists({ _id: answer.surveyId, $or: [{
      authorId: myId
    }, {
      authorizedViewers: [myId]
    }] }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    await answer.updateOne({ isAuthentic: !answer.isAuthentic });
    return !answer.isAuthentic;
  };
};

// src/config/gmail.ts
import { google } from "googleapis";
var oauth2Client = new google.auth.OAuth2(
  ENV_CONFIG.OAUTH_CLIENT_ID,
  ENV_CONFIG.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  refresh_token: ENV_CONFIG.OAUTH_REFRESH_TOKEN
});
var gmail = google.gmail({ version: "v1", auth: oauth2Client });
var gmail_default = gmail;

// src/utils/createRawEmail.ts
var createRawEmail = (to, subject, body) => {
  const message = [
    `From: parissrowlet@gmail.com`,
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: =?utf-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "",
    body
  ].join("\r\n");
  return Buffer.from(message).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

// src/store/BaseStore.ts
import ms2 from "ms";
var BaseStore = class {
  store = /* @__PURE__ */ new Map();
  ttl;
  cleanUpInterval;
  constructor(expiresIn, cleanUpInterval = "5m") {
    this.ttl = ms2(expiresIn);
    this.cleanUpInterval = ms2(cleanUpInterval);
    this.cleanUp();
  }
  deleteIfExpired = (key) => {
    const val = this.store.get(key);
    if (!val) {
      return "missing";
    }
    const now = Date.now();
    if (now - val.createdAt.getTime() > this.ttl) {
      this.store.delete(key);
      return "deleted";
    }
    return "not_deleted";
  };
  getStore = () => this.store;
  get = (key) => {
    this.deleteIfExpired(key);
    return this.store.get(key);
  };
  set = (key, value) => {
    this.store.set(key, value);
  };
  delete = (key) => {
    this.store.delete(key);
  };
  cleanUp = () => {
    setInterval(() => {
      for (const [key] of this.store) {
        this.deleteIfExpired(key);
      }
    }, this.cleanUpInterval);
  };
};

// src/store/OTPStore.ts
import bcrypt3 from "bcryptjs";
var OTPStoreClass = class extends BaseStore {
  constructor() {
    super("5m", "30d");
  }
  setOTP = async (key, code) => {
    try {
      const codeHash = await bcrypt3.hash(code, ENV_CONFIG.SALT_ROUNDS);
      this.set(key, {
        createdAt: /* @__PURE__ */ new Date(),
        codeHash
      });
      return "ok";
    } catch (e) {
      return "not_ok";
    }
  };
  isCodeCorrect = async (key, code) => {
    const entry = this.get(key);
    if (!entry) {
      return false;
    }
    const isCorrect = await bcrypt3.compare(code, entry.codeHash);
    if (isCorrect) {
      this.delete(key);
    }
    return isCorrect;
  };
};
var OTPStore = new OTPStoreClass();

// src/store/VerifiedOTPEntryStore.ts
var VerifiedOTPEntry = class extends BaseStore {
  constructor() {
    super("5m", "30d");
  }
  verifyEntry = (key) => {
    this.set(key, { createdAt: /* @__PURE__ */ new Date() });
  };
  isVerified = (key) => {
    return !!this.get(key);
  };
};
var verifiedEntriesStore = new VerifiedOTPEntry();

// src/services/auth.service.ts
import crypto from "crypto";
var UserNotFound = new NotFoundError("User not found.", "USER_NOT_FOUND");
function generateSixDigitCode() {
  const code = crypto.randomInt(0, 1e6);
  return code.toString().padStart(6, "0");
}
var authHelper = new AuthHelper();
var AuthService = class {
  updatePassword = async ({
    myId,
    newPassword
  }) => {
    const key = `update-password:request:${myId}`;
    const isVerified = verifiedEntriesStore.isVerified(`verified-otp:${myId}`);
    if (!isVerified) {
      throw new UnauthorizedError(
        "Password update request not verified.",
        "UNVERIFIED_PASSWORD_UPDATE_REQUEST"
      );
    }
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const credential = await credential_default.findOne({ userId: myId }).orFail(new NotFoundError("Credentials not found.", "CREDENTIAL_NOT_FOUND"));
    const hashedPass = await authHelper.hash(newPassword);
    credential.password = hashedPass;
    OTPStore.delete(key);
    return await credential.save();
  };
  verifyUpdatePasswordRequestCode = async ({
    myId,
    code
  }) => {
    const key = `update-password:request:${myId}`;
    const storedData = OTPStore.get(key);
    if (!storedData) {
      throw new BadRequestError(
        "Your verification code has expired.",
        "EXPIRED_VERIFICATION_CODE"
      );
    }
    const isCorrectCode = await OTPStore.isCodeCorrect(key, code);
    if (!isCorrectCode) {
      throw new BadRequestError(
        "Incorrect verification code.",
        "INVALID_VERIFICATION_CODE"
      );
    }
    OTPStore.delete(key);
    verifiedEntriesStore.verifyEntry(`verified-otp:${myId}`);
    return "OK";
  };
  updatePasswordRequest = async (myId) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const code = generateSixDigitCode();
    OTPStore.setOTP(`update-password:request:${myId}`, code);
    const { email } = await credential_default.findOne({ userId: myId }).orFail(
      new NotFoundError("Credentials not found.", "CREDENTIAL_NOT_FOUND")
    ).lean();
    const raw = createRawEmail(
      email,
      "Your Verification Code for Inquestia.ask",
      `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <strong><h1>Inquestia.Ask</h1></strong>
      <p>Hello,</p>
      <p>We received a request to verify your account on <strong>Inquestia.ask</strong>.</p>
      <p style="font-size: 18px; font-weight: bold; color: #000;">
        Your verification code is: 
        <span style="display:inline-block; background:#f4f4f4; padding:8px 12px; border-radius:4px; border:1px solid #ddd;">
          ${code}
        </span>
      </p>
      <p>If you didn't request this, please ignore this email.</p>
      <br>
      <p>Thank you,<br>Inquestia.ask</p>
    </div>`
    );
    await gmail_default.users.messages.send({
      userId: "me",
      requestBody: {
        raw
      }
    });
    return {
      email,
      user
    };
  };
  getUserData = async ({ myId }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const { email } = await credential_default.findOne({ userId: user._id }).orFail(
      new NotFoundError("Credentials not found.", "CREDENTIAL_NOT_FOUND")
    );
    return {
      user: { ...user.toObject(), email }
    };
  };
  register = async ({
    email,
    username,
    password,
    code
  }) => {
    const key = `register:request:${email}`;
    const isCorrectCode = await OTPStore.isCodeCorrect(key, code);
    if (!isCorrectCode) {
      throw new BadRequestError(
        "Your verification code is incorrect or has expired",
        "EXPIRED_VERIFICATION_CODE"
      );
    }
    const seed = Math.random().toString(36).substring(7);
    const avatarUrl = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}`;
    const { doesEmailExist, doesUsernameExist } = await authHelper.doesIdentifiersExist({ email, username });
    if (doesEmailExist || doesUsernameExist) {
      throw new ConflictError(
        "Email or username is already in use.",
        "IDENTIFIER_ALREADY_IN_USE"
      );
    }
    return await runWithSession(async (session) => {
      const createdUser = await new user_default({ username, avatar: avatarUrl }).save({
        session
      });
      const hashedPass = await authHelper.hash(password);
      const createdCredential = await new credential_default({
        userId: createdUser._id,
        email,
        password: hashedPass
      }).save({ session });
      return [createdUser, createdCredential];
    });
  };
  sendRegisterOTP = async ({
    email,
    username
  }) => {
    const { doesUsernameExist, doesEmailExist } = await authHelper.doesIdentifiersExist({ email, username });
    if (doesUsernameExist || doesEmailExist) {
      throw new ConflictError(
        "Email or username is already in use.",
        "IDENTIFIER_ALREADY_IN_USE"
      );
    }
    const code = generateSixDigitCode();
    const raw = createRawEmail(
      email,
      "Your Verification Code for Inquestia.ask",
      `<div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <strong><h1>Inquestia.Ask</h1></strong>
      <p>Hello,</p>
      <p>We received a request to verify your account on <strong>Inquestia.ask</strong>.</p>
      <p style="font-size: 18px; font-weight: bold; color: #000;">
        Your verification code is: 
        <span style="display:inline-block; background:#f4f4f4; padding:8px 12px; border-radius:4px; border:1px solid #ddd;">
          ${code}
        </span>
      </p>
      <p>If you didn't request this, please ignore this email.</p>
      <br>
      <p>Thank you,<br>Inquestia.ask</p>
    </div>`
    );
    await gmail_default.users.messages.send({
      userId: "me",
      requestBody: {
        raw
      }
    });
    const key = `register:request:${email}`;
    OTPStore.setOTP(key, code);
    return "OK";
  };
  login = async ({ email, password }) => {
    let credential = await credential_default.findOne({ email }).orFail(new NotFoundError("Credentials not found.", "CREDENTIAL_NOT_FOUND"));
    const user = await user_default.findOne({
      _id: String(credential.userId)
    }).orFail(UserNotFound);
    const isPasswordCorrect = await credential.comparePasswords(password);
    if (!isPasswordCorrect)
      throw new UnauthorizedError(
        IMPLICIT_PASSWORD_MSG.invalid,
        "INVALID_CREDENTIALS"
      );
    if (user.banDetails.isBanned) {
      throw new ForbiddenError(
        `Your account has been banned. Remaining time: ${formatMs(
          user.banDetails.remainingMS
        )}`,
        "BANNED"
      );
    }
    const plain = user.toObject();
    return { user };
  };
};

// src/helper/user.helper.ts
var updateUserStreakIfNeeded = (user, session) => {
  if (!user.streak) {
    return;
  }
  const now = /* @__PURE__ */ new Date();
  const lastResponseTime = new Date(user.streak.lastResponseTime);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastResponse = new Date(
    lastResponseTime.getFullYear(),
    lastResponseTime.getMonth(),
    lastResponseTime.getDate()
  );
  const daysDifference = Math.floor(
    (today.getTime() - lastResponse.getTime()) / (1e3 * 60 * 60 * 24)
  );
  if (daysDifference === 0) {
    return;
  }
  if (daysDifference === 1) {
    user.streak.current += 1;
  } else if (daysDifference > 1) {
    user.streak.current = STREAK_MIN;
  }
  if (user.streak.current > user.streak.highest) {
    user.streak.highest = user.streak.current;
  }
  user.streak.lastResponseTime = now;
  const options = {};
  if (session) {
    options.session = session;
  }
  return user.save(options);
};

// src/schemas/global.schemas.ts
import { isValidObjectId } from "mongoose";
import z8 from "zod";
var ObjectIdSchema = z8.string("Invalid Object ID").refine(isValidObjectId, "Invalid Object ID");

// src/store/SeenSurveyStore.ts
var SeenSurveyStore = class extends BaseStore {
  constructor() {
    super("1h", "1h");
  }
  addToSet = (key, seenId) => {
    const entry = this.get(key);
    if (!entry) {
      return "not_ok";
    }
    const newSeenIds = [...entry.seenIds, seenId];
    this.set(key, {
      createdAt: /* @__PURE__ */ new Date(),
      seenIds: newSeenIds
    });
  };
};
var seenSurveyStore = new SeenSurveyStore();

// src/services/survey.service.ts
import mongoose12 from "mongoose";
var surveyHelper = new EntityHelper(survey_default);
var SurveyService = class {
  compareBoost = (userBooster, surveyBooster) => {
    if (userBooster < surveyBooster) {
      throw new BadRequestError(
        "Insufficient booster points",
        "INSUFFICIENT_BOOSTER_POINT"
      );
    }
    return;
  };
  upsertSurveyDraft = async ({ survey, myId }) => {
    const { error: isSurveyNonExistent, data: surveyId } = ObjectIdSchema.safeParse(survey._id);
    const { _id, ...surveyValues } = survey;
    if (isSurveyNonExistent) {
      const createdDraft = await new survey_default({
        ...surveyValues,
        booster: 0,
        isDraft: true,
        authorId: myId
      }).save();
      return createdDraft;
    }
    const draft = await survey_default.findOneAndUpdate(
      { _id: surveyId, authorId: myId },
      { ...surveyValues, booster: 0, isDraft: true, authorId: myId }
    ).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    return draft;
  };
  upsertSurvey = async ({ survey, myId }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    this.compareBoost(user.toObject().boosterPoint, survey.booster);
    const { _id, ...surveyValues } = survey;
    const { error: isSurveyNonExistent, data: surveyId } = ObjectIdSchema.safeParse(_id);
    const deductBoosterAndGiveCore = async (session) => {
      user.boosterPoint -= surveyValues.booster;
      if (user.core) {
        user.core.current += 100;
        user.core.highest = Math.max(user.core.current, user.core.highest);
      }
      return await user.save({ session });
    };
    if (isSurveyNonExistent) {
      return await runWithSession(async (session) => {
        const newSurvey = await new survey_default({ ...surveyValues, authorId: myId, isDraft: false }).save({
          session
        });
        await deductBoosterAndGiveCore(session);
        await updateUserStreakIfNeeded(user, session);
        return newSurvey;
      });
    }
    return await runWithSession(async (session) => {
      const publishedSurvey = await survey_default.findOneAndUpdate(
        { _id: surveyId, authorId: myId, isDraft: true },
        { ...surveyValues, isDraft: false },
        { session }
      ).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
      await deductBoosterAndGiveCore(session);
      await updateUserStreakIfNeeded(user, session);
      return publishedSurvey;
    });
  };
  reOpenSurvey = async ({ surveyId, myId }) => {
    const survey = await survey_default.findById(surveyId).orFail(
      new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND")
    );
    if (String(survey.authorId) !== myId) {
      throw new UnauthorizedError(
        "You can't re-open someone's survey.",
        "UNAUTHORIZED_SURVEY_REOPENING"
      );
    }
    survey.isClosed = false;
    return await survey.save();
  };
  closeSurvey = async ({ surveyId, myId }) => {
    const survey = await survey_default.findById(surveyId).orFail(
      new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND")
    );
    if (String(survey.authorId) !== myId) {
      throw new UnauthorizedError(
        "You can't close someone's survey.",
        "UNAUTHORIZED_SURVEY_CLOSURE"
      );
    }
    survey.isClosed = true;
    return await survey.save();
  };
  softDelete = async ({ surveyId, myId }) => {
    const survey = await survey_default.findById(surveyId).orFail(
      new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND")
    );
    if (String(survey.authorId) !== myId) {
      throw new UnauthorizedError(
        "You can't soft delete someone's survey.",
        "UNAUTHORIZED_SOFT_DELETE"
      );
    }
    survey.isDeleted = true;
    return await survey.save();
  };
  revokeAuthorization = async ({
    surveyId,
    myId,
    userId
  }) => {
    const survey = await survey_default.findOne({
      _id: surveyId,
      authorId: myId,
      isDeleted: false
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const candidateUser = await user_default.findById(userId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    if (survey.authorizedViewers.every((v) => String(v) !== String(userId))) {
      throw new BadRequestError(
        `${candidateUser.displayName} is not yet authorized.`,
        "NOT_YET_AUTHORIZED_AS_VIEWER"
      );
    }
    survey.authorizedViewers = survey.authorizedViewers.filter(
      (v) => String(v) !== String(userId)
    );
    return await survey.save();
  };
  authorizeUser = async ({
    surveyId,
    myId,
    userId
  }) => {
    const survey = await survey_default.findOne({
      _id: surveyId,
      authorId: myId,
      isDeleted: false
    }).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const candidateUser = await user_default.findById(userId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    if (survey.authorizedViewers.some((v) => String(v) === String(userId))) {
      throw new ConflictError(
        `${candidateUser.displayName} is already authorized.`,
        "ALREADY_AUTHORIZED_AS_VIEWER"
      );
    }
    survey.authorizedViewers.push(candidateUser._id);
    return await survey.save();
  };
  findById = async (surveyId) => {
    const matchedSurvey = await survey_default.findOne({
      _id: surveyId,
      isDeleted: false
    }).populate([
      { path: "authorId", model: "User" },
      { path: "authorizedViewers", model: "User" }
    ]).orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const safeSurvey = {
      ...matchedSurvey.getSafeDetails(),
      authorizedViewers: matchedSurvey.authorizedViewers.map(
        (v) => new user_default(v).getSafeDetails()
      )
    };
    const responses = safeSurvey.questions.map(
      (q) => {
        if (q.type === "text") {
          const { _id: _id2, type: type2, question: question2, isRequired: isRequired2 } = q;
          const text = {
            type: type2,
            question: question2,
            isRequired: isRequired2,
            questionId: _id2,
            answer: ""
          };
          return text;
        }
        const { _id, type, question, isRequired } = q;
        const select = {
          type,
          question,
          isRequired,
          questionId: _id,
          numberOfAnswersAllowed: q.numberOfAnswersAllowed,
          choices: q.choices,
          answers: []
        };
        return select;
      }
    );
    return {
      safeSurvey,
      responses
    };
  };
  getSurveyList = async ({
    myId,
    limit,
    page
  }) => {
    const user = await user_default.findById(myId).orFail(
      new UnauthorizedError("Invalid Session.", "INVALID_SESSION")
    );
    const filterQuery = {
      hasReachedTargetRespondents: false,
      isDeleted: false,
      isTakendown: false,
      isClosed: false,
      isDraft: false
    };
    const seenSurveyIdKey = `survey:seen:${user._id}`;
    if (page === 1) {
      seenSurveyStore.delete(seenSurveyIdKey);
    }
    let alreadySeenIds;
    if (page > 1) {
      alreadySeenIds = seenSurveyStore.get(seenSurveyIdKey)?.seenIds ?? [];
    } else {
      alreadySeenIds = [];
    }
    const totalSurveys = await survey_default.countDocuments(filterQuery);
    const matchedSurveys = await survey_default.aggregate([
      {
        $match: {
          ...filterQuery,
          _id: {
            $nin: alreadySeenIds.map((id) => new mongoose12.Types.ObjectId(id))
          }
        }
      },
      {
        $addFields: {
          algoScore: {
            $add: [
              { $multiply: [{ $rand: {} }, { $add: ["$booster", 1] }] },
              {
                $multiply: [
                  {
                    $rand: {}
                  },
                  {
                    $size: {
                      $setIntersection: ["$tags", user.interests]
                    }
                  }
                ]
              }
            ]
          }
        }
      },
      {
        $sort: {
          algoScore: -1
        }
      },
      {
        $limit: limit
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $unwind: "$author"
      }
    ]);
    const surveys = matchedSurveys.map((s) => ({
      ...new survey_default(s).getSafeDetails(),
      author: new user_default(s.author).getSafeDetails()
    }));
    const nextPage = getNextPage({
      page,
      limit,
      totalResources: totalSurveys
    });
    if (surveys.length > 0) {
      const surveyIds = surveys.map((s) => s._id.toString());
      seenSurveyStore.set(seenSurveyIdKey, {
        createdAt: /* @__PURE__ */ new Date(),
        seenIds: surveyIds
      });
    }
    return {
      nextPage,
      surveys,
      totalSurveys
    };
  };
  purchaseBoost = async ({
    myId,
    quantity
  }) => {
    const BOOST_COST = 1e4;
    const totalCost = quantity * BOOST_COST;
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    if (!user.core || user.core.current < totalCost) {
      throw new BadRequestError(
        `Insufficient points. You need ${totalCost} points but only have ${user.core?.current || 0}.`,
        "INSUFFICIENT_POINTS"
      );
    }
    user.boosterPoint = (user.boosterPoint || 0) + quantity;
    user.core.current -= totalCost;
    await user.save();
    return {
      boosterPoint: user.boosterPoint,
      currentPoints: user.core.current,
      message: `Successfully purchased ${quantity} booster${quantity !== 1 ? "s" : ""}.`
    };
  };
};

// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: ENV_CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: ENV_CONFIG.CLOUDINARY_API_KEY,
  api_secret: ENV_CONFIG.CLOUDINARY_API_SECRET
});
var cloudinary_default = cloudinary;

// src/utils/executeAfterCooldown.ts
var executeAfterCooldown = (cooldown, lastExecuted, callback) => {
  const now = Date.now();
  const lastTime = lastExecuted instanceof Date ? lastExecuted.getTime() : lastExecuted;
  if (now - lastTime >= cooldown) {
    return callback();
  }
  return null;
};

// src/services/user.service.ts
import { Types as Types2 } from "mongoose";
import ms3 from "ms";
var helper = new EntityHelper(survey_default);
var UserService = class {
  getLeaderboards = async () => {
    const rankedUsers = await user_default.find().sort({ "core.current": "descending" }).limit(10);
    return rankedUsers.map((u) => new user_default(u).getSafeDetails());
  };
  getUserSurveys = async ({
    userId,
    limit,
    skip,
    page
  }) => {
    const filterQuery = {
      authorId: userId,
      isDeleted: false,
      isTakendown: false,
      isClosed: false,
      isDraft: false
    };
    const [user, surveys, totalSurveys] = await Promise.all([
      user_default.findById(userId).orFail(
        new NotFoundError("User not found.", "USER_NOT_FOUND")
      ),
      survey_default.find(filterQuery).skip(skip).limit(limit),
      survey_default.countDocuments(filterQuery)
    ]);
    const surveysWithAuthor = surveys.map((s) => ({
      ...s.getSafeDetails(),
      author: user.getSafeDetails()
    }));
    const nextPage = getNextPage({ totalResources: totalSurveys, page, limit });
    return {
      surveys: surveysWithAuthor,
      totalSurveys,
      nextPage
    };
  };
  updateMySocialLinks = async ({
    myId,
    socialLinks
  }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.socialLinks = socialLinks;
    return await user.save();
  };
  updateMyAvatar = async ({
    myId,
    filePath
  }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const { avatar_public_id } = user;
    const { public_id, secure_url } = await cloudinary_default.uploader.upload(
      filePath,
      {
        resource_type: "image",
        folder: "avatars",
        transformation: [
          {
            width: 150,
            height: 150,
            crop: "fill",
            gravity: "auto"
          }
        ]
      }
    );
    if (avatar_public_id) {
      const result = await cloudinary_default.uploader.destroy(avatar_public_id);
    }
    user.avatar_public_id = public_id;
    user.avatar = secure_url;
    await user.save();
    return secure_url;
  };
  updateMyBio = async ({ myId, bio }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.bio = bio;
    return (await user.save()).getSafeDetails();
  };
  updateMyUsername = async ({
    myId,
    username
  }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const sevenDaysInMs = ms3("7D");
    const updatedUser = await executeAfterCooldown(sevenDaysInMs, user.lastUsernameUpdate, async () => {
      user.username = username;
      user.lastUsernameUpdate = /* @__PURE__ */ new Date();
      return (await user.save()).getSafeDetails();
    });
    if (!updatedUser) {
      throw new BadRequestError("You can only update your username once every 7 days.", "USERNAME_UPDATE_COOLDOWN");
    }
    return updatedUser;
  };
  updateMyNickname = async ({
    myId,
    nickname
  }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.nickname = nickname;
    return (await user.save()).getSafeDetails();
  };
  getUserProfileByUsername = async (username) => {
    const user = await user_default.findOne({ username }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    return user.getSafeDetails();
  };
  getSurveysSharedToMe = async ({
    myId,
    page,
    limit,
    skip
  }) => {
    const filterQuery = {
      authorizedViewers: {
        $in: [myId]
      },
      isClosed: false,
      isDeleted: false,
      isTakendown: false
    };
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const [surveysSharedToMe, totalSharedSurveys] = await Promise.all([
      survey_default.find(filterQuery).skip(skip).limit(limit).populate("authorId"),
      survey_default.countDocuments(filterQuery)
    ]);
    const sharedSurveys = surveysSharedToMe.map((s) => ({
      ...s.getSafeDetails(),
      author: new user_default(s.authorId).getSafeDetails()
    }));
    const nextPage = getNextPage({
      page,
      limit,
      totalResources: totalSharedSurveys
    });
    return {
      sharedSurveys,
      totalSharedSurveys,
      nextPage
    };
  };
  getMySurveys = async ({
    myId,
    limit,
    skip,
    page,
    isDraft
  }) => {
    const filterQuery = { authorId: myId, isDraft, isDeleted: false };
    const [matchedSurveys, totalSurveys] = await Promise.all([
      survey_default.find(filterQuery).skip(skip).limit(limit),
      survey_default.countDocuments(filterQuery)
    ]);
    const user = (await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    )).getSafeDetails();
    const surveys = matchedSurveys.map((s) => ({
      ...s.getSafeDetails(),
      author: user
    }));
    const nextPage = getNextPage({ page, limit, totalResources: totalSurveys });
    return {
      surveys,
      nextPage,
      totalSurveys
    };
  };
  getUsersWithSimilarInterests = async ({ myId }) => {
    const user = await user_default.findById(myId).orFail(new NotFoundError("User not found.", "USER_NOT_FOUND")).lean();
    const matchedUsers = await user_default.aggregate([
      { $match: { _id: { $ne: new Types2.ObjectId(myId) } } },
      {
        $addFields: {
          commonInterests: { $setIntersection: ["$interests", user.interests] }
        }
      },
      {
        $match: { commonInterests: { $ne: [] } }
      },
      {
        $limit: 9
      }
    ]);
    const users = matchedUsers.map((u) => new user_default(u).getSafeDetails());
    return { users };
  };
  updateUserInterests = async ({
    myId,
    interests
  }) => {
    const user = await user_default.findById(myId).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    user.isFinishedOnboarding = true;
    user.interests = interests;
    const data = await user.save();
    return data;
  };
};

// src/constants/assistant.constants.ts
var INKO_SYSTEM_PROMPT = `
You are an intelligent research assistant named Inko.

You know the following general app context and rules \u2014 but **do not mention them unless explicitly asked** (treat them as background knowledge only):

- The app homepage shows a list of surveys; surveys with boosters or tags matching a user\u2019s interests are more likely to appear in their feed (boosted matching).
- On the **Profile Page**, users can see their surveys and drafts, and click \u201CView Profile\u201D \u2192 /edit/profile, where they can change avatar, username (every 14 days), nickname, password, bio, interests, and external social links.
- On **/shared-survey**, users see surveys shared by other researchers; they may view answers but not modify them.
- Filtering is **advanced**: the user must click **Apply Filter** or refresh the statistics component for filters to take effect.
- If no charts appear, it is because charts are available **only** for multiple-choice questions, not for text/open-ended ones.
- Users can search in pages.
- The in-app currency is **Core Points**. Every month, users\u2019 Core Points reset (refresh) to **30%** of their prior amount.
- Core Points can be exchanged:
  - **Survey Boosters** (1 booster costs 10,000 core points),
  - **Prepaid Load** (only for PH mobile numbers; \u20B110 load costs 15,000 core points). Prepaid load exchange must be verified by admin.
- Users have a **streak** that continues if they either create or answer at least one survey per day.
- Email addresses are never exposed.
- /response-history page lets users view their past survey answers.
- Settings include: Exchange Center, Transactions (records of core point \u2194 prepaid load exchanges), Feedback page, Logout, Update Profile, Dark Mode toggle.
- More details reside under /about.

**Behavior rules for you (Inko):**
- When users ask you about things **outside** of research field/this system data (not in your knowledge), respond: \u201CI don\u2019t have knowledge about that.\u201D
- Do not engage with any Inappropriate Conversations
- Always base your summaries and answers **only** on survey data given and within the allowed context.
- Don\u2019t spontaneously reveal background rules or app context unless the user specifically asks for them.
- Don't say you're CHATGPT, but Inko, an AI that guides user on this system or application called inquestia.
- **Always prioritize the user\u2019s latest message**: focus on answering the most recent prompt first. Only reference previous messages if they are directly relevant or provide necessary context. Avoid answering old questions that the user has not asked in this turn.
Respond to the user\u2019s latest message now.
`;

// src/store/ConversationStore.ts
var ConversationStore = class extends BaseStore {
  constructor() {
    super("3d", "1d");
  }
};
var conversationStore = new ConversationStore();

// src/services/assistant.service.ts
import axios from "axios";
var AssistantService = class {
  summarizeSurvey = async ({
    myId,
    surveyId,
    isAuthentic
  }) => {
    const user = await user_default.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const survey = await survey_default.findOne({ authorId: myId, _id: surveyId }).populate("questions").orFail(new NotFoundError("Survey not found.", "SURVEY_NOT_FOUND"));
    const query = {
      surveyId: survey._id
    };
    if (isAuthentic !== null) {
      query.isAuthentic = isAuthentic;
    }
    const answers = await answer_default.find(query).lean();
    const questionPrompts = [];
    for (const question of survey.questions) {
      const questionAnswers = answers.flatMap(
        (answer) => answer.responses.filter((r) => String(r.questionId) === String(question._id)).map((r) => {
          if (r.type === "text") {
            return r.answer;
          } else if (r.type === "select") {
            return r.answers.join(", ");
          }
          return "";
        }).filter((a) => a !== "")
      );
      const answerString = questionAnswers.join("\n");
      questionPrompts.push(
        `Question: ${question.question}

Responses:
${answerString}`
      );
    }
    const sysData = INKO_SYSTEM_PROMPT;
    const fullPrompt = questionPrompts.join("\n\n---\n\n");
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: sysData },
          {
            role: "user",
            content: `Please summarize the following survey responses:

${fullPrompt}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${ENV_CONFIG.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    const summary = response.data?.choices?.[0]?.message?.content ?? "Unable to generate summary.";
    return { summary };
  };
  restartConversation = async ({ myId }) => {
    const user = await user_default.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const conversationKey = `conversation:${user._id}`;
    conversationStore.delete(conversationKey);
    return { success: true };
  };
  getConversation = async ({ myId }) => {
    const user = await user_default.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const key = `conversation:${user._id}`;
    const conversation = conversationStore.get(key)?.conversation ?? [];
    return {
      conversation
    };
  };
  sendMessage = async ({ myId, prompt }) => {
    const user = await user_default.exists({ _id: myId }).orFail(
      new NotFoundError("User not found.", "USER_NOT_FOUND")
    );
    const conversationKey = `conversation:${user._id}`;
    const promptObject = {
      //user prompt
      content: prompt,
      role: "user"
    };
    const conversation = conversationStore.get(conversationKey)?.conversation ?? [];
    const updatedConversation = [...conversation, { ...promptObject }];
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: INKO_SYSTEM_PROMPT },
          ...updatedConversation
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${ENV_CONFIG.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    const responseContent = response.data?.choices?.[0]?.message?.content ?? "Internal Server Error.";
    conversationStore.set(
      conversationKey,
      {
        createdAt: /* @__PURE__ */ new Date(),
        conversation: [...updatedConversation, { content: responseContent, role: "system" }]
      }
    );
    return {
      responseContent
    };
  };
};

// src/controllers/auth.controller.ts
var authService = new AuthService();
var AuthController = class {
  updatePasswordRequest = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { email } = await authService.updatePasswordRequest(myId);
    return res.status(200).json({
      success: true,
      message: `Verification code has been sent to ${email}`
    });
  };
  logout = async (req, res) => {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      throw new UnauthorizedError("Session not found.", "SESSION_NOT_FOUND");
    }
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_TOKEN_COOKIE_TTL,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully!"
    });
  };
  refresh = async (req, res) => {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) throw new UnauthorizedError("No session found.", "NO_SESSION_FOUND");
    const payload = await jwt.verify(refreshToken, ENV_CONFIG.JWT_SECRET);
    const accessToken = await jwt.sign({ myId: payload.myId }, ENV_CONFIG.JWT_SECRET, { expiresIn: ACCESS_TOKEN_JWT_TTL });
    return res.status(200).json({
      success: true,
      accessToken
    });
  };
  getSession = async (req, res) => {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      throw new UnauthorizedError("No session found.", "NO_SESSION_FOUND");
    }
    const payload = await jwt.verify(refreshToken, ENV_CONFIG.JWT_SECRET);
    const myId = payload.myId;
    const { user, hasUnreadNotifications } = await authService.getUserData({ myId });
    const accessToken = await jwt.sign({ myId }, ENV_CONFIG.JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_JWT_TTL
    });
    const response = {
      user,
      accessToken,
      hasUnreadNotifications,
      success: true
    };
    return res.status(200).json(response);
  };
  register = async (req, res) => {
    const { email, password, username, code } = RegisterFormSchema.extend({ code: CodeSchema }).strip().parse(req.body);
    await authService.register({ email, password, username, code });
    return res.status(201).json({
      success: true,
      message: "Registered successfully!"
    });
  };
  sendRegisterOTP = async (req, res) => {
    const { email, username } = RegisterFormSchema.strip().parse(req.body);
    await authService.sendRegisterOTP({ email, username });
    return res.status(200).json({
      success: true,
      message: `Verification code has been sent to ${email}`,
      code: "VERIFICATION_CODE_SENT"
    });
  };
  login = async (req, res) => {
    const { email, password } = LoginFormSchema.strip().parse(req.body);
    const { user } = await authService.login({ email, password });
    const token = await jwt.sign({ myId: user._id }, ENV_CONFIG.JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_JWT_TTL
    });
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: REFRESH_TOKEN_COOKIE_TTL,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user
    });
  };
  verifyUpdatePasswordRequestCode = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const code = CodeSchema.parse(req.body.code);
    await authService.verifyUpdatePasswordRequestCode({ myId, code });
    return res.status(200).json({
      success: true,
      message: "Verification code confirmed!"
    });
  };
  updatePassword = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { password: newPassword } = LoginFormSchema.pick({ password: true }).parse(req.body);
    await authService.updatePassword({ myId, newPassword });
    return res.status(200).json({
      success: true,
      message: "Password updated successfully!"
    });
  };
};

// src/middlewares/auth.middlewares.ts
import jwt2 from "jsonwebtoken";
var AuthMiddlewares = class {
  verifyAccessToken = async (req, res, next) => {
    const authHeader = req.headers.authorization ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError(TOKEN_MSG.invalid, "INVALID_TOKEN");
    }
    const token = authHeader.split(" ")[1] ?? "";
    const payload = await jwt2.verify(
      token,
      ENV_CONFIG.JWT_SECRET
    );
    req.myId = payload.myId;
    next();
  };
};

// src/utils/catchErrors.ts
var catchErrors = (fn) => {
  const wrapped = async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
  return wrapped;
};

// src/router/auth.router.ts
import { Router } from "express";
var authRouter = Router();
var authController = new AuthController();
var authMiddleware = new AuthMiddlewares();
authRouter.post("/login", catchErrors(authController.login));
authRouter.post("/register-otp", catchErrors(authController.sendRegisterOTP));
authRouter.post("/register", catchErrors(authController.register));
authRouter.get("/session", catchErrors(authController.getSession));
authRouter.post("/refresh", catchErrors(authController.refresh));
authRouter.post("/logout", catchErrors(authController.logout));
authRouter.post("/update-password-request", catchErrors(authMiddleware.verifyAccessToken), catchErrors(authController.updatePasswordRequest));
authRouter.post("/verify-update-password-code", catchErrors(authMiddleware.verifyAccessToken), catchErrors(authController.verifyUpdatePasswordRequestCode));
authRouter.post("/update-password", catchErrors(authMiddleware.verifyAccessToken), catchErrors(authController.updatePassword));
var auth_router_default = authRouter;

// src/controllers/survey.controller.ts
import z9 from "zod";
var surveyService = new SurveyService();
var SurveyController = class {
  searchSurveys = async (req, res) => {
    const query = z9.string().min(1).parse(req.query.q);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const surveyQuery = { $or: [
      { description: { $regex: query, $options: "i" } },
      { title: { $regex: query, $options: "i" } },
      { tags: {
        $in: [query]
      } }
    ] };
    const [surveys, totalSurveys] = await Promise.all([
      survey_default.find(surveyQuery).skip(skip).limit(limit).populate("authorId").lean(),
      survey_default.countDocuments(surveyQuery)
    ]);
    const nextPage = getNextPage({ page, limit, totalResources: totalSurveys });
    return res.status(200).json({
      success: true,
      surveys: surveys.map((s) => ({
        ...new survey_default(s).getSafeDetails(),
        author: new user_default(s.authorId).getSafeDetails()
      })),
      totalSurveys,
      nextPage
    });
  };
  saveMySurveyAsDraft = async (req, res) => {
    const survey = SurveyFormSchema.parse(req.body.survey);
    const myId = ObjectIdSchema.parse(req.myId);
    const result = await surveyService.upsertSurveyDraft({ survey, myId });
    logger_default.info("saved as draft", result);
    return res.status(200).json({
      success: true,
      result,
      message: "Saved as draft!"
    });
  };
  createMySurvey = async (req, res) => {
    const survey = SurveyFormSchema.parse(req.body.survey);
    const myId = ObjectIdSchema.parse(req.myId);
    if (survey.isDraft) {
      throw new BadRequestError("You can't publish a draft survey", "PUBLISH_DRAFT_ERROR");
    }
    await surveyService.upsertSurvey({ survey, myId });
    return res.status(200).json({
      success: true,
      message: "Survey created!"
    });
  };
  reOpenSurvey = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const myId = ObjectIdSchema.parse(req.myId);
    await surveyService.reOpenSurvey({ surveyId, myId });
    return res.status(200).json({
      success: true,
      message: "Re-opened successfully!"
    });
  };
  closeSurvey = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const myId = ObjectIdSchema.parse(req.myId);
    await surveyService.closeSurvey({ surveyId, myId });
    return res.status(200).json({
      success: true,
      message: "Closed successfully!"
    });
  };
  softDelete = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const myId = ObjectIdSchema.parse(req.myId);
    await surveyService.softDelete({ surveyId, myId });
    return res.status(200).json({
      success: true,
      message: "Deleted successfully!"
    });
  };
  revokeAuthorization = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const userId = ObjectIdSchema.parse(req.params.userId);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await surveyService.revokeAuthorization({
      surveyId,
      userId,
      myId
    });
    const response = {
      success: true,
      message: `Revoked authorization successfully!`
    };
    return res.status(200).json(response);
  };
  authorizeUser = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const userId = ObjectIdSchema.parse(req.params.userId);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await surveyService.authorizeUser({
      surveyId,
      userId,
      myId
    });
    const response = {
      success: true,
      message: `Authorized successfully!`
    };
    return res.status(200).json(response);
  };
  //  GET /api/survey/find-by-id/:surveyId
  getSurveyById = async (req, res) => {
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const { safeSurvey, responses } = await surveyService.findById(surveyId);
    const response = {
      success: true,
      survey: safeSurvey,
      responses
    };
    return res.status(200).json(response);
  };
  getSurveys = async (req, res) => {
    const { page, limit } = QueryParamParser.parse(req.query);
    const myId = ObjectIdSchema.parse(req.myId);
    const { nextPage, surveys, totalSurveys } = await surveyService.getSurveyList({ page, limit, myId });
    const response = {
      success: true,
      nextPage,
      surveys,
      totalSurveys
    };
    return res.status(200).json(response);
  };
  purchaseBoost = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const quantity = z9.number().int().min(1).max(5).parse(req.body.quantity);
    const result = await surveyService.purchaseBoost({ myId, quantity });
    return res.status(200).json({
      success: true,
      ...result
    });
  };
};

// src/controllers/answer.controller.ts
var answerService = new AnswerService();
var AnswerController = class {
  toggleAnswerAuthenticity = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const answerId = ObjectIdSchema.parse(req.params.answerId);
    const isAuthentic = await answerService.toggleIsAuthentic({ myId, answerId });
    return res.status(200).json({
      success: true,
      isAuthentic
    });
  };
  getSurveyAnswers = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const filterForm = AnswerFilterSchema.parse({ ...JSON.parse(req.query.filter), surveyId });
    const { answers, totalAnswers, nextPage } = await answerService.getSurveyAnswers({ myId, skip, limit, page, filterForm });
    const response = {
      answers,
      totalAnswers: totalAnswers?.[0]?.total ?? 0,
      nextPage: null,
      success: true
    };
    return res.status(200).json(response);
  };
  getMyAnswers = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const { answers, totalAnswers, nextPage } = await answerService.getMyAnswers({ myId, skip, limit, page });
    const response = {
      answers,
      totalAnswers,
      nextPage,
      success: true
    };
    return res.status(200).json({
      success: true,
      answers,
      totalAnswers,
      nextPage
    });
  };
  submitAnswer = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const answerForm = AnswerFormSchema.strip().parse(req.body.answerForm);
    await answerService.submitAnswer({ myId, surveyId, answerForm });
    return res.status(200).json({
      success: true,
      message: "Your response was successfully recorded!"
    });
  };
};

// src/router/survey.router.ts
import { Router as Router2 } from "express";
var surveyRouter = Router2();
var surveyController = new SurveyController();
var answerController = new AnswerController();
var authMiddleware2 = new AuthMiddlewares();
surveyRouter.use(catchErrors(authMiddleware2.verifyAccessToken));
surveyRouter.get("/", catchErrors(surveyController.getSurveys));
surveyRouter.get("/search", catchErrors(surveyController.searchSurveys));
surveyRouter.post("/", catchErrors(surveyController.createMySurvey));
surveyRouter.post("/drafts", catchErrors(surveyController.saveMySurveyAsDraft));
surveyRouter.post("/boost", catchErrors(surveyController.purchaseBoost));
surveyRouter.get("/:surveyId", catchErrors(surveyController.getSurveyById));
surveyRouter.delete("/:surveyId", catchErrors(surveyController.softDelete));
surveyRouter.patch("/:surveyId/close", catchErrors(surveyController.closeSurvey));
surveyRouter.patch("/:surveyId/reopen", catchErrors(surveyController.reOpenSurvey));
surveyRouter.patch("/:surveyId/authorize/:userId", catchErrors(surveyController.authorizeUser));
surveyRouter.patch("/:surveyId/revoke/:userId", catchErrors(surveyController.revokeAuthorization));
surveyRouter.post("/:surveyId/answers", catchErrors(answerController.submitAnswer));
surveyRouter.get("/:surveyId/answers", catchErrors(answerController.getSurveyAnswers));
surveyRouter.patch("/:surveyId/answers/:answerId/authenticity", catchErrors(answerController.toggleAnswerAuthenticity));
var survey_router_default = surveyRouter;

// src/config/multer.ts
import multer from "multer";
var storage = multer.memoryStorage();
var upload = multer({
  storage
});
var multer_default = upload;

// src/controllers/user.controller.ts
import z10 from "zod";
var userService = new UserService();
var UserController = class {
  searchUsers = async (req, res) => {
    const query = z10.string().min(1).parse(req.query.q);
    const { skip, limit, page } = QueryParamParser.parse(req.query);
    const userQuery = { $or: [
      { username: { $regex: query, $options: "i" } },
      { nickname: { $regex: query, $options: "i" } }
    ] };
    const [users, totalUsers] = await Promise.all([
      user_default.find(userQuery).skip(skip).limit(limit).lean(),
      user_default.countDocuments(userQuery)
    ]);
    const nextPage = getNextPage({ page, limit, totalResources: totalUsers });
    return res.status(200).json({
      success: true,
      users: users.map((u) => new user_default(u).getSafeDetails()),
      totalUsers,
      nextPage
    });
  };
  getLeaderboards = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const leaderboard = await userService.getLeaderboards();
    const response = {
      leaderboard,
      message: "",
      success: true
    };
    return res.status(200).json(response);
  };
  getUserSurveys = async (req, res) => {
    const { skip, page, limit } = QueryParamParser.parse(req.query);
    const userId = ObjectIdSchema.parse(req.params.userId);
    const { surveys, totalSurveys, nextPage } = await userService.getUserSurveys({ skip, page, limit, userId });
    const response = {
      surveys,
      totalSurveys,
      nextPage,
      success: true
    };
    return res.status(200).json(response);
  };
  updateMySocialLinks = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const socialLinks = SocialLinkListSchema.parse(req.body.socialLinks);
    await userService.updateMySocialLinks({ myId, socialLinks });
    return res.status(200).json({
      success: true,
      message: "Your social links was updated!"
    });
  };
  updateMyAvatar = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const file = req.file;
    if (!file) {
      throw new NotFoundError("File not found.", "FILE_NOT_FOUND");
    }
    AvatarTypeSchema.parse(file.mimetype);
    AvatarSizeSchema.parse(file.size);
    const avatar = file.buffer.toString("base64");
    const filePath = `data:${file.mimetype};base64,${avatar}`;
    const avatarUrl = await userService.updateMyAvatar({ filePath, myId });
    const response = {
      success: true,
      avatarUrl,
      message: "Your avatar was updated!"
    };
    return res.status(200).json(response);
  };
  updateMyBio = async (req, res) => {
    const bio = BioSchema.parse(req.body.bio);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateMyBio({ bio, myId });
    return res.status(200).json({
      success: true,
      message: "Your bio was updated!"
    });
  };
  updateMyNickname = async (req, res) => {
    const nickname = NicknameSchema.parse(req.body.nickname);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateMyNickname({ nickname, myId });
    return res.status(200).json({
      success: true,
      message: "Your nickname was updated!"
    });
  };
  updateMyUsername = async (req, res) => {
    const username = UsernameSchema.parse(req.body.username);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateMyUsername({ username, myId });
    return res.status(200).json({
      success: true,
      message: "Your username was updated!"
    });
  };
  getSurveysSharedToMe = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { skip, page, limit } = QueryParamParser.parse(req.query);
    const { sharedSurveys, totalSharedSurveys, nextPage } = await userService.getSurveysSharedToMe({ myId, skip, page, limit });
    const response = {
      sharedSurveys,
      totalSharedSurveys,
      nextPage,
      success: true
    };
    return res.status(200).json(response);
  };
  getMySurveys = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { skip, page, limit } = QueryParamParser.parse(req.query);
    const isDraft = IsDraftSchema.parse(req.query.isDraft);
    const { surveys, nextPage, totalSurveys } = await userService.getMySurveys({
      myId,
      skip,
      page,
      limit,
      isDraft
    });
    const response = {
      surveys,
      nextPage,
      totalSurveys,
      success: true
    };
    return res.status(200).json(response);
  };
  getUserByUsername = async (req, res) => {
    const username = UsernameSchema.parse(req.params.username);
    const user = await userService.getUserProfileByUsername(username);
    const response = {
      user,
      success: true
    };
    return res.status(200).json(response);
  };
  updateUserInterests = async (req, res) => {
    const interests = InterestListSchema.parse(req.body.interests);
    const myId = ObjectIdSchema.parse(req.myId);
    const data = await userService.updateUserInterests({ myId, interests });
    const response = {
      success: true,
      interests: data.interests,
      message: "Interests updated successfully!"
    };
    return res.status(200).json(response);
  };
  getUsersWithSimilarInterests = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { users } = await userService.getUsersWithSimilarInterests({
      myId
    });
    const response = {
      users,
      success: true
    };
    return res.status(200).json(response);
  };
};

// src/router/user.router.ts
import { Router as Router3 } from "express";
var userRouter = Router3();
var userController = new UserController();
var authMiddleware3 = new AuthMiddlewares();
userRouter.use(catchErrors(authMiddleware3.verifyAccessToken));
userRouter.patch("/me/interests", catchErrors(userController.updateUserInterests));
userRouter.get("/me/similar-interests", catchErrors(userController.getUsersWithSimilarInterests));
userRouter.get("/username/:username", catchErrors(userController.getUserByUsername));
userRouter.get("/me/surveys", catchErrors(userController.getMySurveys));
userRouter.get("/me/shared-to-me", catchErrors(userController.getSurveysSharedToMe));
userRouter.patch("/me/username", catchErrors(userController.updateMyUsername));
userRouter.patch("/me/nickname", catchErrors(userController.updateMyNickname));
userRouter.patch("/me/bio", catchErrors(userController.updateMyBio));
userRouter.patch("/me/avatar", multer_default.single("avatar"), catchErrors(userController.updateMyAvatar));
userRouter.patch("/me/social-links", catchErrors(userController.updateMySocialLinks));
userRouter.get("/surveys/:userId", catchErrors(userController.getUserSurveys));
userRouter.get("/leaderboard", catchErrors(userController.getLeaderboards));
userRouter.get("/search", catchErrors(userController.searchUsers));
var user_router_default = userRouter;

// src/controllers/assistant.controller.ts
var assistantService = new AssistantService();
var AssistantController = class {
  constructor() {
  }
  summarizeSurvey = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const isAuthentic = IsAuthenticParamSchema.parse(req.query.isAuthentic);
    const { summary } = await assistantService.summarizeSurvey({
      surveyId,
      myId,
      isAuthentic
    });
    return res.status(200).json({
      success: true,
      summary
    });
  };
  getStatistics = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const surveyId = ObjectIdSchema.parse(req.params.surveyId);
    const isAuthentic = IsAuthenticParamSchema.parse(req.query.isAuthentic ?? null);
    const survey = await survey_default.findOne({ _id: surveyId }).populate("authorId", "avatar nickname username respondents").lean();
    if (!survey) {
      return res.status(404).json({
        success: false,
        message: "Survey not found"
      });
    }
    if (String(myId) !== String(survey.authorId._id) && !survey.authorizedViewers?.some((viewer) => String(viewer) === String(myId))) {
      return res.status(401).json({
        success: false,
        message: "You're not permitted to view the answers of this survey."
      });
    }
    const questionsWithChoices = survey.questions.filter(
      (q) => q.type === "select" && q?.choices && q.choices.length > 0
    );
    const statistics = await Promise.all(
      questionsWithChoices.map(async (question) => {
        const choicesStats = await Promise.all(
          question.choices.map(async (choice) => {
            const filter = {
              surveyId: String(survey._id),
              "responses.questionId": String(question._id),
              "responses.answers": { $in: [choice] }
            };
            if (isAuthentic !== null) {
              filter.isAuthentic = isAuthentic;
            }
            const count = await answer_default.countDocuments(filter);
            const totalRespondents = survey.respondents.length;
            const percentage = totalRespondents > 0 ? count / totalRespondents * 100 : 0;
            return {
              choice,
              count,
              percentage: parseFloat(percentage.toFixed(2))
            };
          })
        );
        return {
          questionId: question._id,
          question: question.question,
          type: question.type,
          choices: choicesStats,
          createdAt: question.createdAt
        };
      })
    );
    return res.status(200).json({
      success: true,
      statistics,
      survey: {
        _id: survey._id,
        title: survey.title,
        description: survey.description,
        totalRespondents: survey.totalRespondents,
        user: survey.authorId
      }
    });
  };
  restartConversation = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    await assistantService.restartConversation({ myId });
    return res.status(200).json({
      success: true,
      message: "Restarted your conversation!"
    });
  };
  getConversation = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const { conversation } = await assistantService.getConversation({ myId });
    const response = {
      success: true,
      conversation
    };
    return res.status(200).json(response);
  };
  sendMessage = async (req, res) => {
    const myId = ObjectIdSchema.parse(req.myId);
    const prompt = PromptSchema.parse(req.body.prompt);
    const { responseContent } = await assistantService.sendMessage({
      myId,
      prompt
    });
    const response = {
      responseContent,
      success: true
    };
    return res.status(200).json(response);
  };
};

// src/router/assistant.router.ts
import { Router as Router4 } from "express";
var assistantRouter = Router4();
var assistantController = new AssistantController();
var authMiddleware4 = new AuthMiddlewares();
assistantRouter.use(catchErrors(authMiddleware4.verifyAccessToken));
assistantRouter.get("/conversation", catchErrors(assistantController.getConversation));
assistantRouter.post("/conversation", catchErrors(assistantController.sendMessage));
assistantRouter.delete("/conversation", catchErrors(assistantController.restartConversation));
assistantRouter.get("/summary/:surveyId", catchErrors(assistantController.summarizeSurvey));
assistantRouter.get("/statistics/:surveyId", catchErrors(assistantController.getStatistics));
var assistant_router_default = assistantRouter;

// src/router/answers.router.ts
import { Router as Router5 } from "express";
var answersRouter = Router5();
var answerController2 = new AnswerController();
var authMiddleware5 = new AuthMiddlewares();
answersRouter.use(catchErrors(authMiddleware5.verifyAccessToken));
answersRouter.get("/me", catchErrors(answerController2.getMyAnswers));
var answers_router_default = answersRouter;

// src/router/main.router.ts
var mainRouter = Router6();
mainRouter.use("/auth", auth_router_default);
mainRouter.use("/survey", survey_router_default);
mainRouter.use("/user", user_router_default);
mainRouter.use("/assistant", assistant_router_default);
mainRouter.use("/answers", answers_router_default);

// src/utils/errorHandler.ts
import z11 from "zod";
import jwt3 from "jsonwebtoken";
var errorHandler = (error, req, res, next) => {
  logger_default.error(error);
  if (error instanceof jwt3.TokenExpiredError) {
    return res.status(400).json({
      success: false,
      message: TOKEN_MSG.expired,
      details: { ...error },
      code: "EXPIRED_TOKEN"
    });
  }
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      code: error.code
    });
  }
  if (error instanceof z11.ZodError) {
    const firstIssue = error.issues[0]?.message;
    return res.status(400).json({
      success: false,
      message: firstIssue
    });
  }
  return res.status(500).json({
    success: false,
    message: error.message
  });
};

// server.ts
var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.WEB_ORIGIN,
    credentials: true
  })
);
app.set("trust proxy", 1);
app.use("/api", mainRouter);
app.use(errorHandler);
app.get("/", (_, res) => {
  res.send("Server is running");
});
var PORT = process.env.PORT || 5e3;
connectDatabase();
app.listen(PORT, async () => {
  try {
    logger_default.info(`Server running on port ${PORT}`);
  } catch (err) {
    logger_default.error("\u274C Failed to start services:", err);
    process.exit(1);
  }
});
var server_default = app;
export {
  server_default as default
};
//# sourceMappingURL=server.js.map