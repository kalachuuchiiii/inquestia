import { z } from "zod";
import {
  FEEDBACK_TYPE_ENUM,
  MESSAGE_MIN,
  MESSAGE_MAX,
  MESSAGE_MSG,
  FEEDBACK_TYPE_MSG
} from "../constants";

export const FeedbackTypeSchema = z.enum(FEEDBACK_TYPE_ENUM, FEEDBACK_TYPE_MSG.enum);
export const FeedbackMessageSchema = z
  .string()
  .min(MESSAGE_MIN, MESSAGE_MSG.min)
  .max(MESSAGE_MAX, MESSAGE_MSG.max);

export const FeedbackSchema = z.object({
  type: FeedbackTypeSchema,
  message: FeedbackMessageSchema
});
