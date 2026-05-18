import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
import questionSchema from "./question";
import {
  BOOSTER_MAX,
  BOOSTER_MIN,
  AUTHORIZED_VIEWERS_MAX,
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  QUESTIONS_MAX,
  QUESTIONS_MIN,
  TAGS_ENUM,
  TAGS_MAX,
  TAGS_MIN,
  RESPONDENT_COUNT_MAX,
  RESPONDENT_COUNT_MIN,
  TITLE_MAX,
  TITLE_MIN,
  SURVEY_STATUS_ENUM,
} from "@inquestia/constants";

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [TITLE_MIN, `Title must be at least ${TITLE_MIN}`],
      maxlength: [TITLE_MAX, `Title must be at most ${TITLE_MAX}`],
      required: true,
      index: true,
    },
    description: {
      type: String,
      minlength: [
        DESCRIPTION_MIN,
        `Description must be at least ${DESCRIPTION_MIN}`,
      ],
      index: true,
      maxlength: [
        DESCRIPTION_MAX,
        `Description must be at least ${DESCRIPTION_MAX}`,
      ],
      required: true,
    },
    targetRespondents: {
      type: Number,
      min: [
        RESPONDENT_COUNT_MIN,
        `Respondent count must be at least ${RESPONDENT_COUNT_MIN}`,
      ],
      max: [
        RESPONDENT_COUNT_MAX,
        `Respondent count must be at most ${RESPONDENT_COUNT_MAX}`,
      ],
      default: RESPONDENT_COUNT_MIN,
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
        message: `You can only select ${TAGS_MIN}-${TAGS_MAX} tags`,
      },
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (arr: any[]) {
          return arr.length <= QUESTIONS_MAX && arr.length >= QUESTIONS_MIN;
        },
        message: "Survey must contain 1-20 questions.",
      },
    },
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
        message: `You can only authorize ${AUTHORIZED_VIEWERS_MAX}`,
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
      default: BOOSTER_MIN,
      min: BOOSTER_MIN,
      index: true,
      max: BOOSTER_MAX,
    },
    status: {
      type: String,
      enum: SURVEY_STATUS_ENUM,
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
  return this.respondents?.length ?? 0;
});

const Survey = mongoose.model("Survey", surveySchema);
export type ISurvey = InferSchemaType<typeof surveySchema>;
export default Survey;
