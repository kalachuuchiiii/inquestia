import mongoose from "mongoose";


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
      enum: [
        "answer",
        "survey-completed",
        "transaction-fulfilled",
        "transaction-rejected",
        "feedback-response",
        "removed-as-viewer",
        "added-as-viewer",
        "survey-takendown", 
        "point-deduction"
      ],
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

