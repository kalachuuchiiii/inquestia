import { EMAIL_REGEX, PASSWORD_MAX, PASSWORD_MIN } from "@inquestia/constants";
import { isAlphanumeric } from "@inquestia/utils";
import z from "zod";
import { UsernameSchema } from "./user.schemas";
import { ExplicitEmailSchema, ImplicitEmailSchema } from "./common.schemas";

//=====EMAIL_SCHEMAS=====

//=====PASSWORD_SCHEMAS=====
export const ExplicitPasswordSchema = z
  .string()
  .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
  .max(PASSWORD_MAX, `Password must be at most ${PASSWORD_MAX} characters`)
  .refine(isAlphanumeric, `Password must be alpha numeric`)
  .trim();

export const ImplicitPasswordSchema = z
  .string()
  .min(PASSWORD_MIN, `Invalid Credentials`)
  .max(PASSWORD_MAX, `Invalid Credentials`)
  .refine(isAlphanumeric, `Invalid Credentials`)
  .trim();

//====AUTH_FORM_SCHEMAS=====

export const LoginFormSchema = z.object({
  email: ImplicitEmailSchema,
  password: ImplicitPasswordSchema,
});
export const CodeSchema = z.string().min(6).max(6);

export const RegisterFormSchema = z.object({
  username: UsernameSchema,
  email: ExplicitEmailSchema,
  password: ExplicitPasswordSchema,
  code: CodeSchema,
  hasAcceptedPrivacyPolicy: z.literal(
    true,
    `You must first read and accept the privacy policy to continue`
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

export type Code = z.infer<typeof CodeSchema>;

export type LoginForm = z.infer<typeof LoginFormSchema>;
export type RegisterForm = z.infer<typeof RegisterFormSchema>;
export type UpdatePasswordForm = z.infer<typeof UpdatePasswordFormSchema>;
