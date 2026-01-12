import { Types } from "mongoose";
import { FEEDBACK_TYPE_ENUM } from "@shared/constants";

export type FeedbackType = (typeof FEEDBACK_TYPE_ENUM)[number];

export interface IFeedback {
  _id: Types.ObjectId;
  from: Types.ObjectId;       
  feedbackType: FeedbackType; 
  message: string;           
  response?: string;       
  attachments: string[];    
  createdAt: Date;
  updatedAt: Date;
}
