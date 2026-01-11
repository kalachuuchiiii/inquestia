import {
  FEEDBACK_TYPE_ENUM,
  FEEDBACK_TYPE_MSG,
  MESSAGE_MAX,
  MESSAGE_MIN,
  MESSAGE_MSG,
} from "@shared/constants";
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feedbackType: {
      type: String,
      enum: FEEDBACK_TYPE_ENUM,
      validate: {
        validator: (f: string) => FEEDBACK_TYPE_ENUM.includes(f),
        message: FEEDBACK_TYPE_MSG.invalid
      },
      required: true
    },
    response: {
      type: String
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
