
export const FEEDBACK_TYPE_ENUM =  ['suggestion', 'concern', 'help', 'bug', 'account', 'other'] as const;
export const FEEDBACK_TYPE_MSG = {
    enum: 'Invalid feedback type.'
}

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 500;
export const MESSAGE_MSG = {
    min: `Feedback message must be at least ${MESSAGE_MIN} characters.`,
    max: `Feedback message must be at most ${MESSAGE_MAX} characters.`
}