import mongoose from "mongoose";
import baseAnswerSchema from "./answerType";

const answerSchema = new mongoose.Schema(
  {
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    responses: [baseAnswerSchema],
    respondentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isAuthentic: {
      type: Boolean,
      default: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "answers",
    discriminatorKey: "answerType",
    _id: true,
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;
