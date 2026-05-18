import { PROMPT_MAX, PROMPT_MIN } from "@inquestia/constants";
import z from "zod";

export const PromptSchema = z
  .string()
  .min(PROMPT_MIN, `Prompt must be at least ${PROMPT_MIN} character(s)`)
  .max(PROMPT_MAX, `Prompt must be at most ${PROMPT_MAX} characters`);

export type PromptDTO = z.infer<typeof PromptSchema>;
