import {
  QUESTION_CHOICE_MAX,
  QUESTION_CHOICE_MIN,
  QUESTION_CHOICE_MSG,
  QUESTION_CHOICELIST_MAX,
  QUESTION_CHOICELIST_MIN,
  QUESTION_CHOICELIST_MSG,
} from "@inquestia/constants";
import mongoose from "mongoose";

export const selectTypeQuestionSchema = new mongoose.Schema(
  {
    numberOfAnswersAllowed: {
      type: Number,
      max: [QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max],
      min: [QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min],
      default: 1,
    },
    choices: {
      type: [
        {
          type: String,
          minlength: [QUESTION_CHOICE_MIN, QUESTION_CHOICE_MSG.min],
          maxlength: [QUESTION_CHOICE_MAX, QUESTION_CHOICE_MSG.max],
        },
      ],
      validate: {
        validator: (cs: string[]) =>
          cs.length >= QUESTION_CHOICELIST_MIN &&
          cs.length <= QUESTION_CHOICELIST_MAX,
        message: QUESTION_CHOICELIST_MSG.range,
      },
    },
  },
  { _id: false }
);
