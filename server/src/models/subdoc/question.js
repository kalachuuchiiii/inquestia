const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String, 
    minlength: [6, 'Question must be at least 6 characters long.'], 
    maxlength: [250, 'Question cannot exceed 250 characters.'],
    required: [true, 'Question is required.']
  }, 
  type: {
    type: String, 
    required: [true, 'Question type is required.'], 
    enum: {
      values: ['text', 'select'],
      message: 'Question type must be either "text" or "select".'
    }
  }, 
  isRequired: {
    type: Boolean, 
    default: false
  }
}, {
  collection: 'questions',
  discriminatorKey: 'type',
  _id: true
});


module.exports = questionSchema