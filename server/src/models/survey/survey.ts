import mongoose, { Document } from "mongoose";
import questionSchema from "./question";
import {
  APPLIED_BOOSTER_MAX,
  APPLIED_BOOSTER_MIN,
  AUTHORIZED_VIEWERS_MAX,
  AUTHORIZED_VIEWERS_MSG,
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  DESCRIPTION_MSG,
  TAGS_ENUM,
  TAGS_MAX,
  TAGS_MIN,
  TAGS_MSG,
  TARGET_RESPONDENTS_MAX,
  TARGET_RESPONDENTS_MIN,
  TARGET_RESPONDENTS_MSG,
  TITLE_MAX,
  TITLE_MIN,
  TITLE_MSG,
  TOTAL_RESPONDENTS_MAX,
  TOTAL_RESPONDENTS_MSG,
} from "@shared/constants";
import { SurveyDoc, SurveyFields } from "@shared/types";

const surveySchema = new mongoose.Schema<SurveyFields>(
  {
    title: {
      type: String,
      minlength: [TITLE_MIN, TITLE_MSG.min],
      maxlength: [TITLE_MAX, TITLE_MSG.max],
      required: true,
      index: true,
    },
    description: {
      type: String,
      minlength: [DESCRIPTION_MIN, DESCRIPTION_MSG.min],
      index: true,
      maxlength: [DESCRIPTION_MAX, DESCRIPTION_MSG.max],
      required: true,
    },
    targetRespondents: {
      type: Number,
      min: [TARGET_RESPONDENTS_MIN, TARGET_RESPONDENTS_MSG.min],
      max: [TARGET_RESPONDENTS_MAX, TARGET_RESPONDENTS_MSG.max],
      default: 12,
    },
    totalRespondents: {
      type: Number,
      default: 0,
      index: true,
      max: [TOTAL_RESPONDENTS_MAX, TOTAL_RESPONDENTS_MSG.max],
    },
    hasReachedTargetRespondents: {
      type: Boolean,
      default: false,
      index: true,
    },
    closed: {
      type: Boolean,
      default: false,
      index: true,
    },
    tags: {
      type: [{ type: String, enum: TAGS_ENUM, index: true }],
      validate: {
        validator: (val: string[]) =>
          val.length >= TAGS_MIN && val.length <= TAGS_MAX,
        message: TAGS_MSG.range,
      },
      required: true,
    },
    questions: [questionSchema],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    respondents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    isDraft: {
      type: Boolean,
      default: false,
      index: true,
    },
    authorizedViewers: {
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
      ],
      default: [],
      validate: {
        validator: (val: string[]) => val.length <= AUTHORIZED_VIEWERS_MAX,
        message: AUTHORIZED_VIEWERS_MSG.max,
      },
      index: true,
    },
    isTakendown: {
      type: Boolean,
      default: false,
      index: true,
    },
    booster: {
      type: Number,
      default: APPLIED_BOOSTER_MIN,
      min: APPLIED_BOOSTER_MIN,
      index: true,
      max: APPLIED_BOOSTER_MAX,
    },
  },
  { timestamps: true }
);

const Survey = mongoose.model<SurveyDoc>("Survey", surveySchema);

mongoose.model("Question", questionSchema);

export default Survey;
