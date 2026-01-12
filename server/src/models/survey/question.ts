import mongoose from "mongoose";
import { selectTypeQuestionSchema } from "./selectTypeQuestion";
import { QUESTION_TITLE_MAX, QUESTION_TITLE_MIN, QUESTION_TITLE_MSG, QUESTION_TYPE_ENUM, QUESTION_TYPE_MSG } from "@shared/constants";
import { Question } from "@shared/types";



 const questionSchema = new mongoose.Schema<Question & Document>({
  question: {
    type: String, 
    minlength: [QUESTION_TITLE_MIN, QUESTION_TITLE_MSG.min], 
    maxlength: [QUESTION_TITLE_MAX, QUESTION_TITLE_MSG.max],
    required: true
  }, 
  type: {
    type: String, 
    required: true,
    enum: {
      values: QUESTION_TYPE_ENUM,
      message: QUESTION_TYPE_MSG.enum
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
