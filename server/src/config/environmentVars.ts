import dotenv from "dotenv";
dotenv.config({ quiet: true });

const getEnvVar = (key: string) => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing Env ${key}`);
    process.exit(1);
  }
  return value;
};

const requiredVars = [
  "REDIS_KEY",
  "PORT",
  "PEPPER",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "GROQ_API_KEY",
  "EMAIL_KEY",
  "WEB_ORIGIN",
  "MONGODB_KEY",
  "MONGODB_DEV_KEY",
  "REFRESH_TOKEN_TTL",
  "NODE_ENV",
  "SALT_ROUNDS",
  'ACCESS_TOKEN_TTL'
] as const;

requiredVars.forEach(getEnvVar);

export const ENV_CONFIG = {
  PORT: getEnvVar("PORT"),
  REDIS_KEY: getEnvVar("REDIS_KEY"),
  PEPPER: getEnvVar('PEPPER'),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  CLOUDINARY_CLOUD_NAME: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: getEnvVar("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: getEnvVar("CLOUDINARY_API_SECRET"),
  GROQ_API_KEY: getEnvVar("GROQ_API_KEY"),
  EMAIL_KEY: getEnvVar("EMAIL_KEY"),
  WEB_ORIGIN: getEnvVar("WEB_ORIGIN"),
  MONGODB_KEY: getEnvVar("MONGODB_KEY"),
  MONGODB_DEV_KEY: getEnvVar("MONGODB_DEV_KEY"),
  REFRESH_TOKEN_TTL: getEnvVar("REFRESH_TOKEN_TTL"),
  NODE_ENV: getEnvVar("NODE_ENV"),
  SALT_ROUNDS: Number(getEnvVar('SALT_ROUNDS')),
  ACCESS_TOKEN_TTL: getEnvVar('ACCESS_TOKEN_TTL')
} as const;
