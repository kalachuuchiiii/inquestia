
import {
  FEEDBACK_TYPE_ENUM,
  FEEDBACK_TYPE_MSG,
  MESSAGE_MAX,
  MESSAGE_MIN,
  MESSAGE_MSG,
} from "@shared/constants";
import { IFeedback } from "@shared/types";
import mongoose, { Document } from "mongoose";

const feedbackSchema = new mongoose.Schema<IFeedback & Document>(
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

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
