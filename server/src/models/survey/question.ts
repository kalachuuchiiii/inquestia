import mongoose from "mongoose";
import { selectTypeQuestionSchema } from "./selectTypeQuestion";


 const questionSchema = new mongoose.Schema({
  question: {
    type: String, 
    minlength: [6, 'Question must be at least 6 characters long.'], 
    maxlength: [250, 'Question cannot exceed 250 characters.'],
    required: true
  }, 
  type: {
    type: String, 
    required: true,
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

questionSchema.discriminator('select', selectTypeQuestionSchema)

export default questionSchema;
