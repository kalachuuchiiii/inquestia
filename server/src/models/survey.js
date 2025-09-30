const mongoose = require("mongoose");
const questionSchema = require("./subdoc/question.js");

const selectTypeQuestionSchema = new mongoose.Schema({
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
      validator: function (val) {
        return val.length >= 1 && val.length <= 8;
      },
      message: 'You must provide at least 2 choices. upto 8 choices.'
    }
  }
}, { _id: false });

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [6, "Survey title must be at least 6 characters long."],
      maxlength: [250, "Survey title cannot exceed 250 characters."],
      required: [true, "Survey title is required."],
    },
    description: {
      type: String,
      minlength: [6, "Survey description must be at least 6 characters long."],
      maxlength: [500, "Survey description cannot exceed 500 characters."],
      required: [true, "Survey description is required."],
    },
    targetRespondents: {
      type: Number,
      min: [3, "Target respondents must be at least 3."],
      max: [1000, "Target respondents cannot exceed 1000."],
    },
    totalRespondents: {
      type: Number,
      default: 0,
      max: [1000, "Total respondents cannot exceed 1000."],
    },
    hasReachedTargetRespondents: {
      type: Boolean,
      default: false,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      validate: {
        validator: function (val) {
          return val.length >= 1 && val.length <= 5;
        },
        message: "You must select between 1 and 5 tags.",
      },
    },
    questions: [questionSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    respondents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isDraft: {
      type: Boolean,
      default: false,
    },
    booster: {
      type: Number, 
      default: 0,
      min: 0,
      max: 5
    }
  },

  { timestamps: true }
);

const Survey = mongoose.model('Survey', surveySchema);

Survey.schema.path('questions').discriminator('select', selectTypeQuestionSchema);

const deleteAll = async () => {
   await Survey.deleteMany()
}

const indexes = async() => {
  await Survey.collection.dropIndex("respondents_1");
}

surveySchema.pre('deleteOne', async function() {
  const reports = await mongoose.model("Report").deleteMany({
    'reportedEntity.entityId': this._id
  })
  console.log(reports)
})

const del = async() => {
  await Survey.deleteMany();
}



mongoose.model("Question", questionSchema);
module.exports = Survey;