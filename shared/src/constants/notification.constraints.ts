export const NOTIFICATION_ACTION_ENUM = [
  "answer",
  "survey-completed",
  "transaction-fulfilled",
  "transaction-rejected",
  "feedback-response",
  "removed-as-viewer",
  "added-as-viewer",
  "survey-takendown",
  "point-deduction",
] as const;

export const NOTIFICATION_ACTION_MSG = {
    enum: `Unknown Action.`
}
