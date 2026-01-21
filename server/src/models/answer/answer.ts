
import { ANSWER_LIST_MAX, ANSWER_LIST_MIN, ANSWER_LIST_MSG, ANSWER_MAX, ANSWER_MIN, ANSWER_MSG, QUESTION_CHOICELIST_MAX, QUESTION_CHOICELIST_MIN, QUESTION_TYPE_ENUM, QUESTION_TYPE_MSG } from "@shared/constants";
import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";


const answerSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true
  }, 
  answers: [{
    answer: {
      type: mongoose.Schema.Types.Mixed, 
      minlength: [ANSWER_MIN, ANSWER_MSG.min],
      maxlength: [ANSWER_MAX, ANSWER_MSG.max],
      validate: {
        validator: (ans: string | string[]) => {
            if(typeof ans === 'string')return true;
            return ans.length >= ANSWER_LIST_MIN && ans.length <= ANSWER_LIST_MAX
        },
        message: ANSWER_LIST_MSG.range
      },
      required: true
    }, 
    questionId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Question"
    }, 
    type: {
      type: String, 
      enum: {
        values: QUESTION_TYPE_ENUM,
        message: QUESTION_TYPE_MSG.enum
      }
    }
  }], 
  respondentId: {
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

export type AnswerSchema = InferSchemaType<typeof answerSchema>;
export type AnswerModel = HydratedDocument<AnswerSchema>;

const Answer = mongoose.model<AnswerModel>("Answer", answerSchema);


export default Answer;