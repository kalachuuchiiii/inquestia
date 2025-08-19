const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  survey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "survey",
    required: true
  }, 
  answers: [{
    answer: {
      type: mongoose.Schema.Types.Mixed, 
      required: true
    }, 
    question: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "question"
    }, 
    type: {
      type: String, 
      enum: ['text', 'select']
    }
  }], 
  user: {
    index: true, 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user"
  }
}, {
  collection: "answers",
  discriminatorKey: "answerType",
  _id: true
});

const Answer = mongoose.model("Answer", answerSchema);


module.exports = Answer;