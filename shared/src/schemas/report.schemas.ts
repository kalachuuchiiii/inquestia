import { z } from "zod";
import {
  GENERAL_REASONS,
  SPECIFIC_REASON_MIN,
  SPECIFIC_REASON_MAX,
  SPECIFIC_REASON_MSG
} from "@/constants";

export const GeneralReasonSchema = z.enum(GENERAL_REASONS);

export const SpecificReasonSchema = z
  .string()
  .min(SPECIFIC_REASON_MIN, SPECIFIC_REASON_MSG.min)
  .max(SPECIFIC_REASON_MAX, SPECIFIC_REASON_MSG.max);

export const ReportSchema = z.object({
  generalReason: GeneralReasonSchema,
  specificReason: SpecificReasonSchema
});
