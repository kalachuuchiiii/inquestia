
import { NOTIFICATION_ACTION_ENUM, NOTIFICATION_ACTION_MSG } from "@shared/constants";
import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";


const notificationSchema = new mongoose.Schema(
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

export type NotificationSchema = InferSchemaType<typeof notificationSchema>;
export type NotificationModel = HydratedDocument<NotificationSchema>;

const Notification = mongoose.model<NotificationModel>('Notification', notificationSchema);

export default Notification;

