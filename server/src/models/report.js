const { default: mongoose } = require("mongoose");
const { generalReportReasons } = require("../data/generalReportReasons");


const reportSchema = new mongoose.Schema(
  {
    specificReason: {
      type: String,
      required: true,
      minlength: [10, "Your reason must be at least 10 characters long"],
      maxlength: [250, "Please keep your explanation under 250 characters."],
    },

    generalReason: {
      type: String,
      required: true,
      enum: generalReportReasons,
    },
    reportedEntity: {
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'entity',
      },
      entity: {
        type: String, 
        enum: ['User', 'Survey']
      }, 
    },
    entityOwner: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User',
     required: true
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isResolved: {
        type: Boolean, 
        default: false
    }, 
    resolveAction: {
        type: String
    }
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema)

const deleteReports = async () => {
    const res = await Report.deleteMany()
    console.log(res)
}

//deleteReports()

module.exports = Report;