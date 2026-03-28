import {
  QUESTION_CHOICE_MAX,
  QUESTION_CHOICE_MIN,
  QUESTION_CHOICE_MSG,
  QUESTION_CHOICELIST_MAX,
  QUESTION_CHOICELIST_MIN,
  QUESTION_CHOICELIST_MSG,
  QUESTION_TITLE_MAX,
  QUESTION_TITLE_MIN,
  QUESTION_TITLE_MSG,
  QUESTION_TYPE_ENUM,
  QUESTION_TYPE_MSG,
  TEXT_ANSWER_MIN,
} from "@inquestia/constants";
import z from "zod";

export const QuestionTitleSchema = z
  .string()
  .min(QUESTION_TITLE_MIN, QUESTION_TITLE_MSG.min)
  .max(QUESTION_TITLE_MAX, QUESTION_TITLE_MSG.max);

export const QuestionTypeSchema = z.enum(
  QUESTION_TYPE_ENUM,
  QUESTION_TYPE_MSG.enum
);

export const QuestionChoiceSchema = z
  .string()
  .min(QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min)
  .max(QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max);

export const QuestionChoiceListSchema = z
  .array(QuestionChoiceSchema)
  .min(QUESTION_CHOICELIST_MIN, QUESTION_CHOICELIST_MSG.range)
  .max(QUESTION_CHOICELIST_MAX, QUESTION_CHOICELIST_MSG.range);

   const BaseQuestionSchema = {
    question: QuestionTitleSchema,
    _id: z.string().optional().nullable(),
    isRequired: z.boolean()
  }

  const OpenEndedQuestionSchema = z.object({
    ...BaseQuestionSchema,
    type: z.literal('text')
  })

 const CloseEndedQuestionSchema = z.object({
    ...BaseQuestionSchema,
    choices: QuestionChoiceListSchema,
    numberOfAnswersAllowed: z.number()
      .min(QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min)
      .max(QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max),
    type: z.literal('select')
  }).refine((val) => val.numberOfAnswersAllowed <= val.choices.length, {
    message: "numberOfAnswersAllowed must be less than or equal to the number of choices"
  });


 export const QuestionsSchema = z.array(
  z.discriminatedUnion("type", [
    OpenEndedQuestionSchema,
    CloseEndedQuestionSchema,
  ])
);

export type QuestionDTO = z.infer<typeof QuestionsSchema>;
export type OpenEndedQuestionDTO = z.infer<typeof OpenEndedQuestionSchema>;
export type CloseEndedQuestionDTO = z.infer<typeof CloseEndedQuestionSchema>;
