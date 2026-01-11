import { SURVEY_DESCRIPTION_LENGTH_MAX, SURVEY_DESCRIPTION_LENGTH_MESSAGE, SURVEY_DESCRIPTION_LENGTH_MIN, SURVEY_TITLE_LENGTH_MAX, SURVEY_TITLE_LENGTH_MESSAGE, SURVEY_TITLE_LENGTH_MIN } from "@shared/constraints";
import mongoose from "mongoose";
import questionSchema from './question';

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [SURVEY_TITLE_LENGTH_MIN, SURVEY_TITLE_LENGTH_MESSAGE],
      maxlength: [SURVEY_TITLE_LENGTH_MAX, SURVEY_TITLE_LENGTH_MESSAGE],
      required: true,
      index: true
    },
    description: {
      type: String,
      minlength: [SURVEY_DESCRIPTION_LENGTH_MIN, SURVEY_DESCRIPTION_LENGTH_MESSAGE],
      index: true,
      maxlength: [SURVEY_DESCRIPTION_LENGTH_MAX, SURVEY_DESCRIPTION_LENGTH_MESSAGE],
      required: true
    },
    targetRespondents: {
      type: Number,
      min: [3, "Target respondents must be at least 3."],
      max: [1000, "Target respondents cannot exceed 1000."],
    },
    totalRespondents: {
      type: Number,
      default: 0,
      index: true,
      max: [1000, "Total respondents cannot exceed 1000."],
    },
    hasReachedTargetRespondents: {
      type: Boolean,
      default: false,
      index: true
    },
    closed: {
      type: Boolean,
      default: false,
      index: true
    },
    tags: {
      type: [{ type: String, index: true}],
      validate: {
        validator: function (val: string[]) {
          return val.length >= 1 && val.length <= 5;
        },
        message: "You must select between 1 and 5 tags.",
      },
    },
    questions: [questionSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    respondents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
      },
    ],
    isDraft: {
      type: Boolean,
      default: false,
      index: true
    },
    authorizedViewers: {
      type: [{ type:mongoose.Schema.Types.ObjectId, ref: 'User', index: true  }], 
      default: [],
      maxlength: [10, 'You can only have 10 viewers for your survey.'],
      index: true
    },
    isTakendown: {
     type: Boolean,
     default: false,
     index: true
    },
    booster: {
      type: Number, 
      default: 0,
      min: 0,
      index: true,
      max: 5
    }
  },
  { timestamps: true }
);

const Survey = mongoose.model('Survey', surveySchema);

mongoose.model("Question", questionSchema);
module.exports = Survey;