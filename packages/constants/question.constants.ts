

export const QUESTION_TITLE_MIN = 6;
export const QUESTION_TITLE_MAX = 250;
export const QUESTION_TITLE_MSG = {
    min: `A survey question must be at least ${QUESTION_TITLE_MIN} characters.`,
    max: `A survey questoin must be at most ${QUESTION_TITLE_MAX} characters.`
}

export const QUESTION_TYPE_ENUM = ['text', 'select'] as const;
export const QUESTION_TYPE_MSG = {
    enum: `Your survey can only have ${QUESTION_TYPE_ENUM.join(', ')} survey types.`
}

export const QUESTION_CHOICELIST_MIN = 2;
export const QUESTION_CHOICELIST_MAX = 6;
export const QUESTION_CHOICELIST_MSG = {
   range: `Your survey can only have ${QUESTION_CHOICELIST_MIN}-${QUESTION_CHOICELIST_MAX} choices .`
}

export const QUESTIONS_MAX = 20;
export const QUESTIONS_MIN = 1;
export const QUESTIONS_MSG = {
    range: `Survey must contain ${QUESTIONS_MIN}-${QUESTIONS_MAX} questions.`
}
export const QUESTION_CHOICE_MIN = 1;
export const QUESTION_CHOICE_MAX = 250;
export const QUESTION_CHOICE_MSG = {
    min: `A choice must be at least ${QUESTION_CHOICE_MIN} character(s).`,
    max: `A choice must be at most ${QUESTION_CHOICE_MAX} characters.`
}





