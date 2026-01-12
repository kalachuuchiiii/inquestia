import { QUESTION_CHOICELIST_MAX, QUESTION_CHOICELIST_MIN } from "./question.constraints";


export const ANSWER_MIN = 1;
export const ANSWER_MAX = 5000;

export const ANSWER_MSG = {
    min: `An answer must be at least ${ANSWER_MIN} characters.`,
    max: `An answer must be at least ${ANSWER_MAX} characters.`
}

export const ANSWER_LIST_MIN = QUESTION_CHOICELIST_MIN;
export const ANSWER_LIST_MAX = QUESTION_CHOICELIST_MAX;
export const ANSWER_LIST_MSG = {
    range: `Your chosen answers must not be below ${ANSWER_LIST_MIN} and exceed ${ANSWER_MAX}`
}