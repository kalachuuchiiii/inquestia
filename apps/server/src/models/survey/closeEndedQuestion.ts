import {
  QUESTION_CHOICE_MAX,
  QUESTION_CHOICE_MIN,
  QUESTION_CHOICELIST_MAX,
  QUESTION_CHOICELIST_MIN,
} from "@inquestia/constants";
import mongoose from "mongoose";

export const closeEndedSchema = new mongoose.Schema({
  numberOfAnswersAllowed: {
    type: Number,
    min: [1, `Number of answers allowed must be at least ${1}`],
    max: [
      QUESTION_CHOICELIST_MAX,
      `Number of answers allowed must be at most ${QUESTION_CHOICELIST_MAX}`,
    ],
    default: 1,
  },
  choices: {
    type: [
      {
        type: String,
        minlength: [
          QUESTION_CHOICE_MIN,
          `Choice must be at most ${QUESTION_CHOICE_MIN} characters`,
        ],
        maxlength: [
          QUESTION_CHOICE_MAX,
          `Choice must be at most ${QUESTION_CHOICE_MAX} characters`,
        ],
      },
    ],
    validate: {
      validator: (cs: string[]) =>
        cs?.length >= QUESTION_CHOICELIST_MIN &&
        cs?.length <= QUESTION_CHOICELIST_MAX,
      message: `You can only create ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} choices`,
    },
  },
});
