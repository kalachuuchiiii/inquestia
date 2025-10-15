const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true
  }, 
  answers: [{
    answer: {
      type: mongoose.Schema.Types.Mixed, 
      required: true
    }, 
    question: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Question"
    }, 
    type: {
      type: String, 
      enum: ['text', 'select']
    }
  }], 
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  isAuthentic: {
    type: Boolean,
    default: false
  }
}, {
  collection: "answers",
  discriminatorKey: "answerType",
  _id: true, 
  timestamps: true
});

const Answer = mongoose.model("Answer", answerSchema);

const del = async () => {
  const s = await Answer.deleteMany();
}

//del();


module.exports = Answer;