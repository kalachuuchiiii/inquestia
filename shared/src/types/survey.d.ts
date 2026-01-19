import { Document, HydratedDocument, Types } from "mongoose";
import { TAGS_ENUM } from "@shared/constants";
import { UserDTO } from "./user";

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



export type SurveyFields = Document & {
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


export type SurveyDTO = Omit<SurveyFields, 'respondents' | 'authorId' | 'authorizedViewers' | '_id'> & {
  _id: string;
  author: UserDTO;
}

export type SurveyDoc = HydratedDocument<SurveyFields, {}>;

export type SurveyListResponse = {
  surveys: SurveyDTO[],
  nextPage: number | null;
  success: boolean;
  totalSurveys: number;
}

