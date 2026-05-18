import dotenv from "dotenv";
dotenv.config({ quiet: true });
import ms from "ms";
import logger from "./logger";

const getEnvVar = (key: string) => {
  const value = process.env[key];
  if (!value) {
    logger.error(`Missing Env ${key}`);
    process.exit(1);
  }
  return value;
};

const requiredVars = [
  "PORT",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "GROQ_API_KEY",
  "WEB_ORIGIN",
  "MONGODB_KEY",
  "REFRESH_TOKEN_TTL",
  "NODE_ENV",
  "SALT_ROUNDS",
  "ACCESS_TOKEN_TTL",
  "OAUTH_CLIENT_ID",
  "OAUTH_CLIENT_SECRET",
  "OAUTH_REFRESH_TOKEN",
] as const;

requiredVars.forEach(getEnvVar);

export const ENV_CONFIG = {
  PORT: getEnvVar("PORT"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnvVar("CLOUDINARY_API_SECRET"),
  GROQ_API_KEY: getEnvVar("GROQ_API_KEY"),
  WEB_ORIGIN: getEnvVar("WEB_ORIGIN"),
  MONGODB_KEY: getEnvVar("MONGODB_KEY"),
  REFRESH_TOKEN_TTL: getEnvVar("REFRESH_TOKEN_TTL") as ms.StringValue,
  NODE_ENV: getEnvVar("NODE_ENV"),
  SALT_ROUNDS: Number(getEnvVar("SALT_ROUNDS")),
  ACCESS_TOKEN_TTL: getEnvVar("ACCESS_TOKEN_TTL") as ms.StringValue,
  OAUTH_CLIENT_ID: getEnvVar("OAUTH_CLIENT_ID"),
  OAUTH_CLIENT_SECRET: getEnvVar("OAUTH_CLIENT_SECRET"),
  OAUTH_REFRESH_TOKEN: getEnvVar("OAUTH_REFRESH_TOKEN"),
} satisfies Record<(typeof requiredVars)[number], unknown>;
