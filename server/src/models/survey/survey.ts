import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
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
} from "@shared/constants";
import { SurveyDTO } from "@shared/types";
import { Document } from "mongoose";

const surveySchema = new mongoose.Schema(
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

    hasReachedTargetRespondents: {
      type: Boolean,
      default: false,
      index: true,
    },
    isClosed: {
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

surveySchema.virtual("totalRespondents").get(function () {
  return this.respondents.length;
});

surveySchema.methods.getSafeDetails = function () {
  const safeDetails = {
    isClosed: this.isClosed,
    createdAt: this.createdAt,
    description: this.description,
    hasReachedTargetRespondents: this.hasReachedTargetRespondents,
    isDraft: this.isDraft,
    questions: this.questions,
    tags: this.tags,
    author: this.author ?? this.authorId,
    targetRespondents: this.targetRespondents,
    title: this.title,
    totalRespondents: this.totalRespondents,
    _id: this._id,
    authorizedViewers: this.authorizedViewers,
  } satisfies SurveyDTO;
  return safeDetails;
};

export type SurveySchema = InferSchemaType<typeof surveySchema>;
export type SurveyMethods = {
  totalRespondents: number;
  getSafeDetails: () => SurveyDTO;
};
export type SurveyModel = HydratedDocument<SurveySchema, SurveyMethods>;
const Survey = mongoose.model<SurveyModel>("Survey", surveySchema);

export default Survey;
