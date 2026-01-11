export const GENERAL_REASONS = [
  "harassment_or_abuse",
  "hate_or_discrimination",
  "offensive_or_inappropriate_content",
  "sexual_or_nudity",
  "violence_or_graphic_content",
  "spam_or_misleading",
  "scam_or_fraud",
  "privacy_violation",
  "intellectual_property_violation",
  "false_or_misleading_information",
] as const;

export const SPECIFIC_REASON_MIN = 10;
export const SPECIFIC_REASON_MAX = 500;
export const SPECIFIC_REASON_MSG = {
  min:  `A specific reason must be at least ${SPECIFIC_REASON_MIN} characters.`,
  max: `A specific reason must be at most ${SPECIFIC_REASON_MAX} characters`
}
