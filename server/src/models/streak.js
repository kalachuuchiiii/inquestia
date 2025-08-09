const mongoose = require("mongoose"); 


const streakSchema = new mongoose.Schema({
  highestStreak: {
    type: Number, 
    default: 1
  }, 
  lastResponseTime: {
    type: Date, 
    default: () =>new Date()
  }, 
  currentStreak: {
    type: Number, 
    default: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    index: true,
    required: true
  },
}, { timestamps: true })

const Streak = mongoose.model("Streak", streakSchema);

const deleteAll = async() => {
   const inf = await Streak.deleteMany(); 
   console.log(inf);
 }
 
 //deleteAll();
module.exports = Streak;