import mongoose from "mongoose";

export const selectTypeQuestionSchema = new mongoose.Schema({
  multipleChoice: {
    type: Boolean,
    default: false
  },
  choices: {
    type: [{
      type: String,
      minlength: [1, 'Each choice must contain at least 1 character.'],
      maxlength: [100, 'Each choice cannot exceed 100 characters.']
    }],
    validate: {
      validator: function (val: string[]) {
        return val.length >= 1 && val.length <= 8;
      },
      message: 'You must provide at least 2 choices. upto 8 choices.'
    }
  }
}, { _id: false });