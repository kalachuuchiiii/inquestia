import { QUESTION_CHOICE_MAX, QUESTION_CHOICE_MIN, QUESTION_CHOICELIST_MAX, QUESTION_CHOICELIST_MIN } from "./question.constants";


export const TEXT_ANSWER_MIN = 1;
export const TEXT_ANSWER_MAX = 5000;

export const TEXT_ANSWER_MSG = {
    min: `An answer must be at least ${TEXT_ANSWER_MIN} characters.`,
    max: `An answer must be at least ${TEXT_ANSWER_MAX} characters.`
}

export const SELECT_ANSWER_MIN = QUESTION_CHOICE_MIN;
export const SELECT_ANSWER_MAX = QUESTION_CHOICE_MAX
export const SELECT_ANSWER_MSG = {
    range: `An answer must be ${SELECT_ANSWER_MIN}-${SELECT_ANSWER_MAX}`
}

export const SELECT_ANSWER_LIST_MIN = 1;
export const SELECT_ANSWER_LIST_MAX = QUESTION_CHOICELIST_MAX;
export const SELECT_ANSWER_LIST_MSG = {
    range: `Your chosen answers must not be below ${SELECT_ANSWER_LIST_MIN} and exceed ${SELECT_ANSWER_LIST_MAX}`
}

export const NUMBER_OF_ANSWERS_ALLOWED_MIN = 1;
export const NUMBER_OF_ANSWERS_ALLOWED_MAX = QUESTION_CHOICELIST_MAX;
export const NUMBER_OF_ANSWERS_ALLOWED_MSG = {
    range: `You can only choose answers from ${NUMBER_OF_ANSWERS_ALLOWED_MIN}-${NUMBER_OF_ANSWERS_ALLOWED_MAX} choices.`
}

