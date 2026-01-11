import {
  EXPLICIT_EMAIL_MSG,
  EXPLICIT_PASSWORD_MSG,
  IMPLICIT_EMAIL_MSG,
  IMPLICIT_PASSWORD_MSG,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from "@/constants";
import { isAlphanumeric } from "@/utils";
import z from "zod";

export const explicitEmailSchema = z.email(EXPLICIT_EMAIL_MSG.invalid);
export const implicitEmailSchema = z.email(IMPLICIT_EMAIL_MSG.invalid);

export const explicitPasswordSchema = z
  .string()
  .min(PASSWORD_MIN, EXPLICIT_PASSWORD_MSG.min)
  .max(PASSWORD_MAX, EXPLICIT_PASSWORD_MSG.max)
  .refine(isAlphanumeric, EXPLICIT_PASSWORD_MSG.invalid);

export const implicitPasswordSchema =  z
  .string()
  .min(PASSWORD_MIN, IMPLICIT_PASSWORD_MSG.min)
  .max(PASSWORD_MAX, IMPLICIT_PASSWORD_MSG.max)
  .refine(isAlphanumeric, IMPLICIT_PASSWORD_MSG.invalid);
