import {
  QUESTION_CHOICE_MAX,
  QUESTION_CHOICE_MIN,
  QUESTION_CHOICELIST_MAX,
  QUESTION_CHOICELIST_MIN,
  QUESTION_TYPE_ENUM,
  TEXT_ANSWER_MAX,
  TEXT_ANSWER_MIN,
} from "@inquestia/constants";
import mongoose from "mongoose";

const baseAnswerSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: QUESTION_TYPE_ENUM,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  {
    discriminatorKey: "type",
    _id: false,
  }
);

baseAnswerSchema.discriminator(
  "open_ended",
  new mongoose.Schema({
    answer: {
      type: String,
      minlength: [
        TEXT_ANSWER_MIN,
        `An answer must be at least ${TEXT_ANSWER_MIN} characters`,
      ],
      maxlength: [
        TEXT_ANSWER_MAX,
        `An answer must be at most ${TEXT_ANSWER_MAX} characters`,
      ],
      default: "",
    },
  })
);

baseAnswerSchema.discriminator(
  "close_ended",
  new mongoose.Schema({
    answers: {
      type: [
        {
          type: String,
          minlength: [
            QUESTION_CHOICE_MIN,
            `An answer must be at least ${QUESTION_CHOICE_MIN} character`,
          ],
          maxlength: [
            QUESTION_CHOICE_MAX,
            `An answer must be at most ${QUESTION_CHOICE_MAX} characters`,
          ],
        },
      ],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= QUESTION_CHOICELIST_MAX && arr.length > 0;
        },
        message: `You can only submit ${1}-${QUESTION_CHOICELIST_MAX} answers`,
      },
      default: [],
    },
    choices: {
      type: [{ type: String }],
      default: [],
    },
    numberOfAnswersAllowed: {
      type: Number,
      min: [
        QUESTION_CHOICELIST_MIN,
        `You can only submit ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} answers`,
      ],
      max: [
        QUESTION_CHOICELIST_MAX,
        `You can only submit ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} answers`,
      ],
      default: 1,
    },
  })
);

export default baseAnswerSchema;
