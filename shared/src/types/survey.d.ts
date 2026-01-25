
import { UserDTO } from "./user";
export interface SelectTypeQuestionDTO {
    type: "select";
    _id?: string;
    question: string;
    isRequired: boolean;
    multipleChoice: boolean;
    choices: string[];
}
export interface TextTypeQuestionDTO {
    type: "text";
    _id?: string;
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
    tags: string[];
    targetRespondents: number;
    authorizedViewers: string[] | UserDTO[];
    title: string;
    totalRespondents: number;
};
export type SurveyForm = {
    title: string;
    description: string;
    isDraft: boolean;
    questions: (TextTypeQuestionDTO | SelectTypeQuestionDTO)[];
    tags: typeof INTEREST_ENUM[number][];
    targetRespondents: number;
    booster: number;
    _id?: string;
};
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
};
export type AuthorizeUserResponse = {
    success: boolean;
    message: string;
};
