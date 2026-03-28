import { SelectTypeQuestionDTO, SurveyDTO, TextTypeQuestionDTO, type QuestionDTO } from "./survey";
import { UserDTO } from "./user";



export type TextTypeQuestionFormFields = Omit<TextTypeQuestionDTO, '_id'> & {
  questionId: string;
  answer: string;
}



export type SelectTypeQuestionFormFields = Omit<SelectTypeQuestionDTO, '_id'> & {
  questionId: string;
  answers: string[];
}

export type QuestionFormFields = TextTypeQuestionFormFields | SelectTypeQuestionFormFields

export type AnswerFormFields = {
  surveyId: string;
  responses: QuestionFormFields[];
  isAnonymous: boolean;
};

export type AnswerDTO = {
  survey: Pick<SurveyDTO, 'questions' | '_id' | 'description' |'title'>;
  _id: string;
  responses: ({
    type: 'text',
    questionId: string;
    answer: string;
  } | {
    type: 'select',
    questionId: string;
    answers: string[];
  })[],
  respondent: UserDTO;
  respondentId: string;
  isAuthentic: boolean;
}




export type QuestionWithAnswers = {
    title: string;
    description: string;
    respondentId: string;
    respondent: UserDTO | null;
    isAuthentic: boolean;
    questions: ({
        question: string;
        isRequired: boolean;
        questionId: string;
        type: "select";
        answers: string[];
        choices: string[];
        answer?: never;
    } | {
        question: string;
        isRequired: boolean;
        questionId: string;
        type: "text";
        answer: string;
        answers?: never;
        choices?: never;
    } | undefined)[];
    survey: {
        _id: string;
        title: string;
        description: string;
        questions: QuestionDTO[];
        authorId: string;
        author: UserDTO | null;
    };
    _id: string;
}
export type GetMyAnswersResponse = {
  totalAnswers: number;
  answers: QuestionWithAnswers[],
  nextPage: number | null;
  success: boolean;
}