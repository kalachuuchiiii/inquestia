
import { NOTIFICATION_ACTION_ENUM, NOTIFICATION_ACTION_MSG } from "@shared/constants";
import { INotification } from "@shared/types";
import mongoose, { Document } from "mongoose";


const notificationSchema = new mongoose.Schema<INotification & Document>(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    action: {
      type: String,
      enum: {
        values: NOTIFICATION_ACTION_ENUM,
        message: NOTIFICATION_ACTION_MSG.enum
      },
      required: true,
    },
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ sender: 1, receiver: 1 });

notificationSchema.pre('save', function(next) {
  if (this.sender && this.receiver && this.sender.equals(this.receiver)) {
    return next(new Error('Sender and receiver cannot be the same user.'));
  }
  next();
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

