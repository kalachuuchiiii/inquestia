const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { textValidator, nicknameValidator, emailValidator } = require("../utils/string.validators.js");
const { urlValidator } = require("../utils/schema/urlValidator.js");
const { interests } = require("../data/interests.js");


const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    index: true
  },
  streak: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Streak",
    unique: true,
    index: true
  },
  username: {
    type: String,
    unique: true,
    minlength: 6,
    lowercase: true,
    validate: {
      validator: textValidator,
      message: "Username can only contain letters, numbers, underscores, and dot."
    },
    index: true
  },
  nickname: {
    maxlength: 26,
    type: String,
    validate: {
      validator: nicknameValidator,
      message: "Nickname can only contain letters, numbers, underscores, dot, and a space."
    },
    index: true
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
    maxlength: [100, 'Bio can only contain 100 characters'],
    default: ''
  },
  interests: {
    type: [String],
    enum: interests,
    default: ['personal']
  },
  lastUsernameUpdate: {
    type: Date,
    default: null
  },
  points: {
    type: Number, 
    default: 0
  },
  externalLinks: [
    {
      type: String,
      validate: {
        validator: urlValidator
      },
      minlength: 6,
      maxlength: 46
    }
  ],
  password: {
    type: String,
    required: [true, "Password is required."]
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: {
      validator: emailValidator,
      message: "Invalid email format."
    },
    index: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isFinishedOnboarding: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const deleteAll = async () => {
  const inf = await User.deleteMany();
  console.log(inf);
}

//deleteAll();

module.exports = User;

