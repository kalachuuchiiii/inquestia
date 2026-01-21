
import { GENERAL_REASONS, SPECIFIC_REASON_MAX, SPECIFIC_REASON_MIN, SPECIFIC_REASON_MSG } from "@shared/constants";
import mongoose, { Document, HydratedDocument, InferSchemaType } from "mongoose";


const reportSchema = new mongoose.Schema(
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

export type ReportSchema = InferSchemaType<typeof reportSchema>;
export type ReportModel = HydratedDocument<ReportSchema>;

const Report = mongoose.model<ReportModel>('Report', reportSchema)


export default Report;