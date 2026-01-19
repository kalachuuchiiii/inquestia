import { Types } from "mongoose";
import { QUESTION_TYPE_ENUM } from "@shared/constants";

export type AnswerItem = {
  answer: string | string[];  
  questionId: Types.ObjectId;  
  type: (typeof QUESTION_TYPE_ENUM)[number];
};

export interface IAnswer {
  _id: Types.ObjectId;

  surveyId: Types.ObjectId; 
  respondentId: Types.ObjectId;       

  answers: AnswerItem[];
  isAuthentic: boolean;

  answerType?: string;     

  createdAt: Date;
  updatedAt: Date;
}


