import {
  EXPLICIT_EMAIL_MSG,
  EXPLICIT_PASSWORD_MSG,
  IMPLICIT_EMAIL_MSG,
  IMPLICIT_PASSWORD_MSG,
  MUST_ACCEPT_PRIVACY_POLICY,
  MUST_ACCEPT_PRIVACY_POLICY_MSG,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from "../constants";
import { isAlphanumeric } from "../utils";
import z from "zod";
import { UsernameSchema } from "./user.schemas";

export const ExplicitEmailSchema = z.email(EXPLICIT_EMAIL_MSG.invalid).trim();
export const ImplicitEmailSchema = z.email(IMPLICIT_EMAIL_MSG.invalid).trim();

export const ExplicitPasswordSchema = z
  .string()
  .min(PASSWORD_MIN, EXPLICIT_PASSWORD_MSG.min)
  .max(PASSWORD_MAX, EXPLICIT_PASSWORD_MSG.max)
  .refine(isAlphanumeric, EXPLICIT_PASSWORD_MSG.invalid)
  .trim();

export const ImplicitPasswordSchema =  z
  .string()
  .min(PASSWORD_MIN, IMPLICIT_PASSWORD_MSG.min)
  .max(PASSWORD_MAX, IMPLICIT_PASSWORD_MSG.max)
  .refine(isAlphanumeric, IMPLICIT_PASSWORD_MSG.invalid)
  .trim();

  export const LoginFormSchema = z.object({ 
    email: ImplicitEmailSchema,
    password: ImplicitPasswordSchema
  })


  export const RegisterFormSchema = z.object({
    username: UsernameSchema,
    email: ExplicitEmailSchema,
    password: ExplicitPasswordSchema,
    hasAcceptedPrivacyPolicy: z.literal(MUST_ACCEPT_PRIVACY_POLICY, MUST_ACCEPT_PRIVACY_POLICY_MSG.invalid)
  })

  export const CodeSchema = z.string().min(6).max(6);