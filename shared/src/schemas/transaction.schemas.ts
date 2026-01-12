import { z } from "zod";
import {
  STATUS_ENUM,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_MAX,
  PHONE_NUMBER_MSG,
  AMOUNT_ENUM,
  AMOUNT_MSG
} from "@/constants";

export const StatusSchema = z.enum(STATUS_ENUM);

export const PhoneNumberSchema = z
  .string()
  .min(PHONE_NUMBER_MIN, PHONE_NUMBER_MSG.min)
  .max(PHONE_NUMBER_MAX, PHONE_NUMBER_MSG.max)
  .regex(/^\d+$/, PHONE_NUMBER_MSG.invalid);

export const AmountSchema = z
  .number()
  .refine(val => AMOUNT_ENUM.includes(val), AMOUNT_MSG.invalid);

export const TransactionSchema = z.object({
  status: StatusSchema,
  phoneNumber: PhoneNumberSchema,
  amount: AmountSchema
});
