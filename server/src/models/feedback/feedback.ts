
import {
  FEEDBACK_TYPE_ENUM,
  FEEDBACK_TYPE_MSG,
  MESSAGE_MAX,
  MESSAGE_MIN,
  MESSAGE_MSG,
} from "@shared/constants";
import mongoose, { Document, HydratedDocument, InferSchemaType } from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedbackType: {
      type: String,
      enum: {
        values: FEEDBACK_TYPE_ENUM,
        message: FEEDBACK_TYPE_MSG.enum
      },
      required: true
    },
    response: {
      type: String //the admin's
    },
    message: {
      type: String,
      min: [MESSAGE_MIN, MESSAGE_MSG.min],
      max: [MESSAGE_MAX, MESSAGE_MSG.max],
      required: true
    },
    attachments: {
      type: [{ type: String }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export type FeedbackSchema = InferSchemaType<typeof feedbackSchema>;
export type FeedbackModel = HydratedDocument<FeedbackSchema>;

const Feedback = mongoose.model<FeedbackModel>("Feedback", feedbackSchema);

export default Feedback;
