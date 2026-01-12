import { Types } from "mongoose";
import { TAGS_ENUM } from "@shared/constants";

export interface SelectTypeQuestion {
  multipleChoice: boolean;
  choices: string[];  
}


export type Question = {
  _id: Types.ObjectId,
  question: string;
  type: string;
  isRequired: boolean;
};

export interface ISurvey {
  _id: Types.ObjectId;

  title: string;
  description: string;

  targetRespondents: number;
  totalRespondents: number;

  hasReachedTargetRespondents: boolean;
  closed: boolean;
  isDraft: boolean;
  isTakendown: boolean;

  tags: (typeof TAGS_ENUM)[number][];

  questions: Question[];
  authorId: Types.ObjectId;     
  respondents: Types.ObjectId[];  
  authorizedViewers: Types.ObjectId[];

  booster: number;

  createdAt: Date;
  updatedAt: Date;
}
