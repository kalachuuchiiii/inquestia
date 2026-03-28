import { NUMBER_OF_ANSWERS_ALLOWED_MAX, NUMBER_OF_ANSWERS_ALLOWED_MIN, NUMBER_OF_ANSWERS_ALLOWED_MSG, SELECT_ANSWER_LIST_MAX, SELECT_ANSWER_LIST_MIN, SELECT_ANSWER_LIST_MSG, SELECT_ANSWER_MAX, SELECT_ANSWER_MIN, SELECT_ANSWER_MSG, TEXT_ANSWER_MAX, TEXT_ANSWER_MIN, TEXT_ANSWER_MSG } from "@inquestia/constants";
import mongoose from "mongoose";

 export const baseAnswerSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
}, {
    discriminatorKey: 'type',
    _id: false
})

const textTypeAnswerSchema = baseAnswerSchema.discriminator('text', new mongoose.Schema({
   answer: {
    type: String,
    minlength: [TEXT_ANSWER_MIN, TEXT_ANSWER_MSG.min],
    maxlength: [TEXT_ANSWER_MAX, TEXT_ANSWER_MSG.max],
    default: ''
   }
}))

const selectTypeAnswerSchema = baseAnswerSchema.discriminator('select', new mongoose.Schema({
   answers: {
    type: [{ 
        type: String,
        minlength: [SELECT_ANSWER_MIN, SELECT_ANSWER_MSG.range],
        maxlength: [SELECT_ANSWER_MAX, SELECT_ANSWER_MSG.range]
    }],
    validate: {
        validator: function(arr: string[]){
            return arr.length <= SELECT_ANSWER_LIST_MAX && arr.length >= SELECT_ANSWER_LIST_MIN
        },
        message: SELECT_ANSWER_LIST_MSG.range
    },
    default: []
   },
   numberOfAnswersAllowed: {
    type: Number,
    min: [NUMBER_OF_ANSWERS_ALLOWED_MIN, NUMBER_OF_ANSWERS_ALLOWED_MSG.range],
    max: [NUMBER_OF_ANSWERS_ALLOWED_MAX, NUMBER_OF_ANSWERS_ALLOWED_MSG.range],
    default: 1
   },
}))

