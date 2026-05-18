import { EMAIL_REGEX, QUESTION_CHOICELIST_MAX } from "@inquestia/constants";
import z from "zod";

export const TimestampSchema = z.coerce
  .date()
  .refine((d) => d < new Date(), "Date cannot be in the future")
  .transform((d) => d.toISOString());

export const IDSchema = z.preprocess(
  (v) => String(v),
  z.string().regex(/^[a-fA-F0-9]{24}$/, `Invalid Object ID`)
);

export const ExplicitEmailSchema = z
  .string()
  .regex(EMAIL_REGEX, "Invalid Email")
  .trim();
export const ImplicitEmailSchema = z
  .string()
  .regex(EMAIL_REGEX, "Invalid Credentials")
  .trim();

export const NumberOfAnswersAllowedSchema = z.coerce
  .number()
  .min(1, `${1}-${QUESTION_CHOICELIST_MAX} number of answers allowed`)
  .max(
    QUESTION_CHOICELIST_MAX,
    `${1}-${QUESTION_CHOICELIST_MAX} number of answers allowed`
  );
