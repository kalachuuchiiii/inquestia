export const QUESTION_TITLE_MIN = 1;
export const QUESTION_TITLE_MAX = 250;

export const QUESTION_TYPE_ENUM = ["open_ended", "close_ended"] as const;

export type QuestionType = (typeof QUESTION_TYPE_ENUM)[number];
export const QUESTION_CHOICELIST_MIN = 2;
export const QUESTION_CHOICELIST_MAX = 6;

export const QUESTIONS_MAX = 20;
export const QUESTIONS_MIN = 1;

export const QUESTION_CHOICE_MIN = 1;
export const QUESTION_CHOICE_MAX = 250;
