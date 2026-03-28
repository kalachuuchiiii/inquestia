
import { PROMPT_MAX, PROMPT_MIN, PROMPT_MSG } from "@inquestia/constants";
import z from "zod";

export const PromptSchema = z.string().min(PROMPT_MIN, PROMPT_MSG.range).max(PROMPT_MAX, PROMPT_MSG.range);

export type PromptDTO = z.infer<typeof PromptSchema>;