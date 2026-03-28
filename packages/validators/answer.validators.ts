import z from "zod";
import { QuestionChoiceListSchema } from "./question.schemas";
import {
  SELECT_ANSWER_LIST_MAX,
  SELECT_ANSWER_LIST_MIN,
  SELECT_ANSWER_LIST_MSG,
  SELECT_ANSWER_MAX,
  SELECT_ANSWER_MIN,
  SELECT_ANSWER_MSG,
  TEXT_ANSWER_MAX,
  TEXT_ANSWER_MIN,
  TEXT_ANSWER_MSG,
} from "@inquestia/constants";

const BaseAnswerSchema = {
  questionId: z.string(),
};
const TextTypeAnswerSchema = z.object({
  ...BaseAnswerSchema,
  type: z.literal("text"),
  answer: z
    .string()
    .min(TEXT_ANSWER_MIN, TEXT_ANSWER_MSG.min)
    .max(TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max),
});

const TextTypeFilterSchema = TextTypeAnswerSchema.extend({
  answer: z.string().max(TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max),
});

const SelectTypeAnswerSchema = z.object({
  ...BaseAnswerSchema,
  type: z.literal("select"),
  numberOfAnswersAllowed: z
    .number()
    .min(SELECT_ANSWER_LIST_MIN, SELECT_ANSWER_LIST_MSG.range)
    .max(SELECT_ANSWER_LIST_MAX, SELECT_ANSWER_LIST_MSG.range),
  answers: z.array(
    z
      .string()
      .min(SELECT_ANSWER_MIN, SELECT_ANSWER_MSG.range)
      .max(SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range)
  ),
});

const SelectTypeFilterSchema = SelectTypeAnswerSchema.extend({
  answers: z.array(z.string().max(SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range)),
});

export const AnswerFormSchema = z.object({
  isAnonymous: z.boolean(),
  responses: z.array(
    z.discriminatedUnion("type", [TextTypeAnswerSchema, SelectTypeAnswerSchema])
  ),
});

export const AnswerFilterSchema = AnswerFormSchema.extend({
  isAuthentic: z.boolean().nullable().catch(null),
  surveyId: z.string(),
  isAnonymous: z.boolean().nullable().catch(null),
  responses: z.array(
    z.discriminatedUnion("type", [TextTypeFilterSchema, SelectTypeFilterSchema])
  ),
});

export const isAuthenticSchema = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return null;
}, z.boolean().nullable().catch(null));
