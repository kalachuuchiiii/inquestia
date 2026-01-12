
import { GENERAL_REASONS, SPECIFIC_REASON_MAX, SPECIFIC_REASON_MIN, SPECIFIC_REASON_MSG } from "@shared/constants";
import { IReport } from "@shared/types";
import mongoose, { Document } from "mongoose";



const reportSchema = new mongoose.Schema<IReport & Document>(
  {
    specificReason: {
      type: String,
      required: true,
      minlength: [SPECIFIC_REASON_MIN, SPECIFIC_REASON_MSG.min],
      maxlength: [SPECIFIC_REASON_MAX, SPECIFIC_REASON_MSG.max],
    }, 
    generalReason: {
      type: String,
      required: true,
      enum: GENERAL_REASONS,
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
        type: String  //the admin (me) decides what will this be in his own words
    }
  },
  { timestamps: true }
);

const Report = mongoose.model('Report', reportSchema)

module.exports = Report;