
import mongoose, { HydratedDocument, InferSchemaType, type Model } from "mongoose";
import { baseAnswerSchema } from "./answerType";
import { AnswerDTO } from "@inquestia/types";


const answerSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true
  }, 
  responses: [baseAnswerSchema], 
  respondentId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    default: null
  },

  isAuthentic: {
    type: Boolean,
    default: false
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  }
}, {
  collection: "answers",
  discriminatorKey: "answerType",
  _id: true, 
  timestamps: true
});


answerSchema.methods.getSafeDetails = function(){
  return {
    _id: this._id,
    survey: this.surveyId,
    responses: this.responses,
    respondent: this.respondent,
    respondentId: typeof this.respondentId,  //ids are automatically populated
    isAuthentic: this.isAuthentic,
  } satisfies AnswerDTO;
}

export type AnswerSchema = InferSchemaType<typeof answerSchema>;
export type AnswerMethods = {
  getSafeDetails: () => AnswerDTO;
}
export type AnswerModel = Model<AnswerSchema, {}, AnswerMethods>;


const Answer = mongoose.model<AnswerSchema, AnswerModel>("Answer", answerSchema);


// h();


export default Answer;