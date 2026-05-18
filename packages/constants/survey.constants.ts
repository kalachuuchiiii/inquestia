import { INTEREST_ENUM } from "./user.constants";

export const TITLE_MIN = 1;
export const TITLE_MAX = 1000;

export const DESCRIPTION_MIN = 1;
export const DESCRIPTION_MAX = 2500;

export const RESPONDENT_COUNT_MIN = 3;
export const RESPONDENT_COUNT_MAX = 1000;
export const SURVEY_STATUS_ENUM = ["published", "draft"] as const;
export const TAGS_ENUM = INTEREST_ENUM;
export const TAGS_MIN = 1;
export const TAGS_MAX = 6;

export const AUTHORIZED_VIEWERS_MAX = 20;

export const BOOSTER_MAX = 5;
export const BOOSTER_MIN = 0;

export type SurveyStatus = (typeof SURVEY_STATUS_ENUM)[number];
