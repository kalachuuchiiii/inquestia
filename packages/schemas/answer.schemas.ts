import z from "zod";
import {
  QUESTION_CHOICE_MAX,
  QUESTION_CHOICE_MIN,
  QUESTION_CHOICELIST_MAX,
  QUESTION_CHOICELIST_MIN,
  TEXT_ANSWER_MAX,
  TEXT_ANSWER_MIN,
} from "@inquestia/constants";
import {
  QuestionChoiceListSchema,
  QuestionChoiceSchema,
  QuestionTitleSchema,
} from "./question.schemas";
import { IDSchema, TimestampSchema } from "./common.schemas";
import { UserSchema, type User } from "./user.schemas";
import { SurveySchema, type Survey } from "./survey.schemas";

//=====ANSWER SCHEMAS=====

export const OpenEndedAnswer = z
  .string()
  .min(
    TEXT_ANSWER_MIN,
    `An open ended answer must be at least ${TEXT_ANSWER_MIN} characters`
  )
  .max(
    TEXT_ANSWER_MAX,
    `An open ended answer must be at most ${TEXT_ANSWER_MAX} characters`
  );

const OpenEndedResponseSchema = z.object({
  questionId: IDSchema,
  question: z.string().optional(),
  type: z.literal("open_ended"),
  answer: OpenEndedAnswer,
  isRequired: z.boolean().catch(false),
});

export const NumberOfAnswersAllowedSchema = z
  .number()
  .min(1, `You can only submit ${1}-${QUESTION_CHOICELIST_MAX} answers`)
  .max(
    QUESTION_CHOICELIST_MAX,
    `You can only submit ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} answers`
  );

const CloseEndedResponseSchema = z.object({
  questionId: IDSchema,
  type: z.literal("close_ended"),
  question: z.string().optional(),
  isRequired: z.boolean().catch(false),
  numberOfAnswersAllowed: NumberOfAnswersAllowedSchema,
  answers: z.array(QuestionChoiceSchema).min(0).max(QUESTION_CHOICELIST_MAX),
  choices: QuestionChoiceListSchema.catch([]),
});

//===ANSWER SCHEMA FILTERSS====

const OpenEndedAnswerFilterSchema = OpenEndedResponseSchema.safeExtend({
  answer: z
    .string()
    .max(
      TEXT_ANSWER_MAX,
      `An answer must be at most ${TEXT_ANSWER_MAX} characters`
    )
    .catch(""),
});

const CloseEndedAnswerFilterSchema = CloseEndedResponseSchema.safeExtend({
  answers: z.array(
    z
      .string()
      .max(
        QUESTION_CHOICE_MAX,
        `A choice must be at most ${QUESTION_CHOICE_MAX} characters`
      )
      .catch("")
  ),
});

//=====MAIN SCHEMAS=====

export const ResponseSchema = z.discriminatedUnion("type", [
  OpenEndedResponseSchema,
  CloseEndedResponseSchema,
]);

export const ResponsesSchema = z.array(ResponseSchema);

export const AnswerFormSchema = z.object({
  isAnonymous: z.boolean(),
  surveyId: IDSchema,
  responses: ResponsesSchema,
});

export const AnswerSchema = z
  .object({
    _id: IDSchema,
    responses: ResponsesSchema,
    isAuthentic: z.boolean(),
    createdAt: TimestampSchema,
    updatedAt: TimestampSchema,
    isAnonymous: z.boolean(),
    respondentId: UserSchema,
    respondent: UserSchema.optional(),
    survey: SurveySchema.optional(),
    surveyId: SurveySchema,
  })
  .transform((v) => {
    return {
      ...v,
      survey: v.surveyId,
      respondent: !v.isAnonymous ? v.respondentId : undefined,
      respondentId: !v.isAnonymous ? v.respondentId : undefined,
    };
  });

export type Answer = z.infer<typeof AnswerSchema>;

export const AnswerFilterSchema = AnswerFormSchema.extend({
  isAuthentic: z.boolean().nullable().catch(null),
  isAnonymous: z.boolean().nullable().catch(null),
  responses: z.array(
    z.discriminatedUnion("type", [
      OpenEndedAnswerFilterSchema,
      CloseEndedAnswerFilterSchema,
    ])
  ),
});

export const IsAuthenticParamSchema = z.preprocess((val) => {
  if (val === "true") return true;
  if (val === "false") return false;
  return null;
}, z.boolean().nullable().catch(null));

//=====TYPES=====

export type OpenEndedAnswer = z.infer<typeof OpenEndedResponseSchema>;
export type CloseEndedAnswer = z.infer<typeof CloseEndedResponseSchema>;
export type AnswerForm = z.infer<typeof AnswerFormSchema>;

export type OpenEndedFilterForm = z.infer<typeof OpenEndedAnswerFilterSchema>;
export type CloseEndedFilterForm = z.infer<typeof CloseEndedAnswerFilterSchema>;
export type AnswerFilterForm = z.infer<typeof AnswerFilterSchema>;
export type Response = z.infer<typeof ResponseSchema>;
