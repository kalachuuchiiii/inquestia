import { z } from "zod";
import {
  STATUS_ENUM,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_MAX,
  PHONE_NUMBER_MSG,
  AMOUNT_ENUM,
  AMOUNT_MSG
} from "@/constants";

export const statusSchema = z.enum(STATUS_ENUM);

export const phoneNumberSchema = z
  .string()
  .min(PHONE_NUMBER_MIN, PHONE_NUMBER_MSG.min)
  .max(PHONE_NUMBER_MAX, PHONE_NUMBER_MSG.max)
  .regex(/^\d+$/, PHONE_NUMBER_MSG.invalid);

export const amountSchema = z
  .number()
  .refine(val => AMOUNT_ENUM.includes(val), AMOUNT_MSG.invalid);

export const transactionSchema = z.object({
  status: statusSchema,
  phoneNumber: phoneNumberSchema,
  amount: amountSchema
});
