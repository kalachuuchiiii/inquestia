const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { textValidator, nicknameValidator, emailValidator } = require("../utils/string.validators.js");
const { urlValidator } = require("../utils/schema/urlValidator.js");
const { interests } = require("../data/interests.js");


const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },
    bannedAt: {
      type: Date, 
      default: null
    }, 
    banDuration: {
      type: Number, 
      default: null
    },
    streak: {
      highest: {
        type: Number,
        default: 1,
        index: true,
      },
      lastResponseTime: {
        type: Date,
        default: () => new Date(),
      },
      current: {
        type: Number,
        default: 1,
        index: true,
      },
    },
    username: {
      type: String,
      unique: true,
      minlength: [6, "Username must be at least 6 characters long."],
      maxlength: [20, "Username must not exceed 20 characters."],
      lowercase: true,
      validate: {
        validator: textValidator,
        message:
          "Username can only contain letters, numbers, underscores, and dots.",
      },
      index: true,
    },
    avatar_public_id: {
      type: String,
      default: null,
    },
    nickname: {
      maxlength: 20,
      type: String,
      validate: {
        validator: nicknameValidator,
        message:
          "Nickname can only contain letters, numbers, underscores, dot, and a space.",
      },
      index: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [100, "Bio can only contain 100 characters"],
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "transgender", "non-binary", "other"],
      required: true,
    },
    interests: {
      type: [String],
      enum: interests,
      default: ["personal"],
      validate: {
        validator: function (val) {
          return val.length <= 10;
        },
        message: "You can select up to 10 interests.",
      },
    },
    lastUsernameUpdate: {
      type: Date,
      default: () => new Date(),
    },
    point: {
      highest: {
        type: Number,
        default: 0,
        index: true,
      },
      current: {
        type: Number,
        default: 0,
        index: true,
      },
    },
    externalLinks: [
      {
        type: String,
        validate: {
          validator: urlValidator,
        },
        minlength: 6,
        maxlength: 46,
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: {
        validator: emailValidator,
        message: "Invalid email format.",
      },
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    isBirthdayModified: {
      type: Boolean,
      default: false,
    },
    lastInterestChange: {
      type: Date,
      default: null,
    },
    lastGenderChange: {
      type: Date,
      default: () => new Date(),
    },
    isFinishedOnboarding: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const deleteAll = async () => {
  const inf = await User.deleteMany();
  console.log(inf);
}

console.log(Object.keys(User.schema.paths))

//deleteAll();

module.exports = User;

