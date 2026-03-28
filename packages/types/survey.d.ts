

import z from "zod";

import { UserDTO } from "./user";
import { AnswerFormFields } from "./answer";
export interface SelectTypeQuestionDTO {
    type: "select";
    _id?: string | null;
    question: string;
    isRequired: boolean;
    numberOfAnswersAllowed: number;
    choices: string[];
} 

export interface TextTypeQuestionDTO {
    type: "text";
    _id?: string | null;
    question: string;
    isRequired: boolean;
}
export type QuestionDTO = TextTypeQuestionDTO | SelectTypeQuestionDTO;
export type SurveyDTO = {
    _id: string;
    author: UserDTO;
    isClosed: boolean;
    createdAt: Date;
    description: string;
    hasReachedTargetRespondents: boolean;
    isDraft: boolean;
    questions: QuestionDTO[];
    targetRespondents: number;
    authorizedViewers: string[] | UserDTO[];
    title: string;
    booster: number;
    totalRespondents: number;
};
export type SurveyForm = z.infer<typeof SurveyFormSchema>
export type SurveyListResponse = {
    surveys: SurveyDTO[];
    nextPage: number | null;
    success: boolean;
    totalSurveys: number;
};
export type GetAuthorizedViewersResponse = {
    success: boolean;
    authorizedViewers: UserDTO[];
};
export type GetSurveyByIdResponse = {
    survey: Omit<SurveyDTO, "authorizedViewers"> & {
        authorizedViewers: UserDTO[];
    };
    success: boolean;
    responses: AnswerFormFields["responses"];
};
export type AuthorizeUserResponse = {
    success: boolean;
    message: string;
};
