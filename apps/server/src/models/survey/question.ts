import mongoose from "mongoose";
import { closeEndedSchema } from "./closeEndedQuestion";
import {
  QUESTION_TITLE_MAX,
  QUESTION_TITLE_MIN,
  QUESTION_TYPE_ENUM,
} from "@inquestia/constants";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      minlength: [
        QUESTION_TITLE_MIN,
        `Question must be at least ${QUESTION_TITLE_MIN} characters`,
      ],
      maxlength: [
        QUESTION_TITLE_MAX,
        `Question must be at least ${QUESTION_TITLE_MAX} characters`,
      ],
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: QUESTION_TYPE_ENUM,
        message: `Invalid question type`,
      },
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "questions",
    discriminatorKey: "type",
    _id: true,
  }
);

questionSchema.discriminator("close_ended", closeEndedSchema);

export default questionSchema;
