import z from "zod";
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


//=====ANSWER SCHEMAS=====

const OpenEndedAnswerSchema = z.object({
  questionId: z.string(),
  type: z.literal("text"),
  answer: z
    .string()
    .min(TEXT_ANSWER_MIN, TEXT_ANSWER_MSG.min)
    .max(TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max),
});

const CloseEndedAnswerSchema = z.object({
  questionId: z.string(),
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


//===ANSWER SCHEMA FILTERSS====

const OpenEndedAnswerFilterSchema = OpenEndedAnswerSchema.extend({
  answer: z.string().max(TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max),
});


const CloseEndedAnswerFilterSchema = CloseEndedAnswerSchema.extend({
  answers: z.array(z.string().max(SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range)),
});

//=====MAIN SCHEMAS=====

export const AnswerFormSchema = z.object({
  isAnonymous: z.boolean(),
  responses: z.array(
    z.discriminatedUnion("type", [OpenEndedAnswerSchema, CloseEndedAnswerSchema])
  ),
});

export const AnswerFilterSchema = AnswerFormSchema.extend({
  isAuthentic: z.boolean().nullable().catch(null),
  surveyId: z.string(),
  isAnonymous: z.boolean().nullable().catch(null),
  responses: z.array(
    z.discriminatedUnion("type", [OpenEndedAnswerFilterSchema, CloseEndedAnswerFilterSchema])
  ),
});

export const IsAuthenticParamSchema = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return null;
}, z.boolean().nullable().catch(null));


//=====TYPES=====

export type TextTypeAnswerDTO = z.infer<typeof OpenEndedAnswerSchema>;
export type SelectTypeAnswerDTO = z.infer<typeof CloseEndedAnswerSchema>;
export type AnswerFormDTO = z.infer<typeof AnswerFormSchema>;

export type TextTypeFilterDTO = z.infer<typeof OpenEndedAnswerFilterSchema>;
export type SelectTypeFilterDTO = z.infer<typeof CloseEndedAnswerFilterSchema>;
export type AnswerFilterDTO = z.infer<typeof AnswerFilterSchema>;

export type IsAuthenticDTO = z.infer<typeof IsAuthenticParamSchema>;