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
} from "../constants";
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
