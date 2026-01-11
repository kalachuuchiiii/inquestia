import mongoose from "mongoose";


const answerSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true
  }, 
  answers: [{
    answer: {
      type: mongoose.Schema.Types.Mixed, 
      required: true
    }, 
    questionId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Question"
    }, 
    type: {
      type: String, 
      enum: ['text', 'select']
    }
  }], 
  userId: {
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


export default Answer;