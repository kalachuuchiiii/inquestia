const { default: mongoose } = require("mongoose");


const notificationSchema = new mongoose.Schema({
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
    enum: ["answer", "survey-completed"],
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
});

notificationSchema.index({ sender: 1, receiver: 1 });

notificationSchema.pre('save', function(next) {
  if (this.sender && this.receiver && this.sender.equals(this.receiver)) {
    return next(new Error('Sender and receiver cannot be the same user.'));
  }
  next();
});

const Notification = mongoose.model('Notification', notificationSchema)
const del = async() => {
  await Notification.deleteMany();
}

module.exports = Notification;

