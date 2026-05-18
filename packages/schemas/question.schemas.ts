import {
  QUESTION_CHOICE_MAX,
  QUESTION_CHOICE_MIN,
  QUESTION_CHOICELIST_MAX,
  QUESTION_CHOICELIST_MIN,
  QUESTION_TITLE_MAX,
  QUESTION_TITLE_MIN,
  QUESTION_TYPE_ENUM,
  TEXT_ANSWER_MIN,
  TITLE_MAX,
  TITLE_MIN,
} from "@inquestia/constants";
import z from "zod";
import { IDSchema, NumberOfAnswersAllowedSchema } from "./common.schemas";

export const QuestionTitleSchema = z
  .string()
  .min(
    QUESTION_TITLE_MIN,
    `Question title must be at least ${QUESTION_TITLE_MIN} characters`
  )
  .max(
    QUESTION_TITLE_MAX,
    `Question title must be at most ${QUESTION_TITLE_MAX} characters`
  );

export const QuestionTypeSchema = z.enum(
  QUESTION_TYPE_ENUM,
  "Invalid question type"
);

export const QuestionChoiceSchema = z
  .string()
  .min(
    QUESTION_CHOICE_MIN,
    `A choice must be at least ${QUESTION_CHOICE_MIN} characters`
  )
  .max(
    QUESTION_CHOICE_MAX,
    `A choice must be at most ${QUESTION_CHOICE_MAX} characters`
  );

export const QuestionChoiceListSchema = z
  .array(QuestionChoiceSchema)
  .min(
    QUESTION_CHOICELIST_MIN,
    `You can only add ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} choices`
  )
  .max(
    QUESTION_CHOICELIST_MAX,
    `You can only add ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} choices`
  );

const BaseQuestionSchema = {
  question: QuestionTitleSchema,
  _id: IDSchema.optional(),
  isRequired: z.boolean(),
};

const OpenEndedQuestionSchema = z.object({
  ...BaseQuestionSchema,
  type: z.literal("open_ended"),
});

const CloseEndedQuestionSchema = z
  .object({
    ...BaseQuestionSchema,
    choices: QuestionChoiceListSchema,
    numberOfAnswersAllowed: NumberOfAnswersAllowedSchema,
    type: z.literal("close_ended"),
  })
  .refine((val) => val.numberOfAnswersAllowed < val.choices.length, {
    message:
      "numberOfAnswersAllowed must be less than to the number of choices",
  });

export const QuestionSchema = z.discriminatedUnion("type", [
  OpenEndedQuestionSchema,
  CloseEndedQuestionSchema,
]);

export const QuestionsSchema = z.array(QuestionSchema);
export type Question = z.infer<typeof QuestionSchema>;
export type Questions = z.infer<typeof QuestionsSchema>;
export type OpenEndedQuestion = z.infer<typeof OpenEndedQuestionSchema>;
export type CloseEndedQuestion = z.infer<typeof CloseEndedQuestionSchema>;
