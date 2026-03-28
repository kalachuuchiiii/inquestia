import {
  EXPLICIT_EMAIL_MSG,
  EXPLICIT_PASSWORD_MSG,
  IMPLICIT_EMAIL_MSG,
  IMPLICIT_PASSWORD_MSG,
  MUST_ACCEPT_PRIVACY_POLICY,
  MUST_ACCEPT_PRIVACY_POLICY_MSG,
  PASSWORD_MAX,
  PASSWORD_MIN,
} from "@inquestia/constants";
import { isAlphanumeric } from "@inquestia/utils";
import z from "zod";
import { UsernameSchema } from "./user.schemas";

//=====EMAIL_SCHEMAS=====

export const ExplicitEmailSchema = z
  .string()
  .email(EXPLICIT_EMAIL_MSG.invalid)
  .trim();
export const ImplicitEmailSchema = z
  .string()
  .email(IMPLICIT_EMAIL_MSG.invalid)
  .trim();

//=====PASSWORD_SCHEMAS=====
export const ExplicitPasswordSchema = z
  .string()
  .min(PASSWORD_MIN, EXPLICIT_PASSWORD_MSG.min)
  .max(PASSWORD_MAX, EXPLICIT_PASSWORD_MSG.max)
  .refine(isAlphanumeric, EXPLICIT_PASSWORD_MSG.invalid)
  .trim();

export const ImplicitPasswordSchema = z
  .string()
  .min(PASSWORD_MIN, IMPLICIT_PASSWORD_MSG.min)
  .max(PASSWORD_MAX, IMPLICIT_PASSWORD_MSG.max)
  .refine(isAlphanumeric, IMPLICIT_PASSWORD_MSG.invalid)
  .trim();

//====AUTH_FORM_SCHEMAS=====

export const LoginFormSchema = z.object({
  email: ImplicitEmailSchema,
  password: ImplicitPasswordSchema,
});

export const RegisterFormSchema = z.object({
  username: UsernameSchema,
  email: ExplicitEmailSchema,
  password: ExplicitPasswordSchema,
  hasAcceptedPrivacyPolicy: z.literal(
    MUST_ACCEPT_PRIVACY_POLICY,
    MUST_ACCEPT_PRIVACY_POLICY_MSG.invalid
  ),
});

export const UpdatePasswordFormSchema = z
  .object({
    newPassword: ExplicitPasswordSchema,
    confirmPassword: ExplicitPasswordSchema,
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    "Passwords do not match."
  );

//=====Verification code schema
export const CodeSchema = z.string().min(6).max(6);

export type ExplicitEmailDTO = z.infer<typeof ExplicitEmailSchema>;
export type ImplicitEmailDTO = z.infer<typeof ImplicitEmailSchema>;

export type ExplicitPasswordDTO = z.infer<typeof ExplicitPasswordSchema>;
export type ImplicitPasswordDTO = z.infer<typeof ImplicitPasswordSchema>;

export type CodeDTO = z.infer<typeof CodeSchema>;

export type LoginFormDTO = z.infer<typeof LoginFormSchema>;
export type RegisterFormDTO = z.infer<typeof RegisterFormSchema>;
export type UpdatePasswordDTO = z.infer<typeof UpdatePasswordFormSchema>;
