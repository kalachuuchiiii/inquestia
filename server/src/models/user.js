const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs");
const { textValidator, emailValidator } = require("../utils/string.validators.js");

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
    minlength: 1, 
    maxlength: 18,
    type: String, 
    validate: {
      validator: textValidator, 
      message: "Nickname can only contain letters, numbers, underscores, and dot."
    }, 
    index: true
  }, 
  avatar: {
    type: String,
  }, 
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
 
 const deleteAll = async() => {
   const inf = await User.deleteMany(); 
   console.log(inf);
 }
 
 //deleteAll();

module.exports = User;

