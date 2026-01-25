import { INTEREST_ENUM } from "./user.constraints";

export const TITLE_MIN = 12;
export const TITLE_MAX = 250;
export const TITLE_MSG = {
  min: `Survey title must be at least ${TITLE_MIN} characters.`,
  max: `Survey title must be at most ${TITLE_MAX} characters.`,
  range: `Survey title must be ${TITLE_MIN}-${TITLE_MAX} characters.`
};

export const DESCRIPTION_MIN = 22;
export const DESCRIPTION_MAX = 1000;
export const DESCRIPTION_MSG = {
  min: `Survey description must be at least ${DESCRIPTION_MIN} characters.`,
  max: `Survey description must be at most ${DESCRIPTION_MAX} characters.`,
  range: `Survey description must be ${DESCRIPTION_MIN}-${DESCRIPTION_MAX} characters.`
}

export const TARGET_RESPONDENTS_MIN = 8;
export const TARGET_RESPONDENTS_MAX = 1000;
export const TARGET_RESPONDENTS_MSG = {
  min: `You must have at least ${TARGET_RESPONDENTS_MIN} target respondents`,
  max: `You must have at most ${TARGET_RESPONDENTS_MAX} target respondents`
}

export const TOTAL_RESPONDENTS_MAX = TARGET_RESPONDENTS_MAX;
export const TOTAL_RESPONDENTS_MSG = {
  max: `The target number of respondents have already been reached.`
}

export const TAGS_ENUM = INTEREST_ENUM;
export const TAGS_MIN = 1;
export const TAGS_MAX = 6;
export const TAGS_MSG = {
  range: `Your survey must contain ${TAGS_MIN}-${TAGS_MAX} tags`
}

export const AUTHORIZED_VIEWERS_MAX = 12;
export const AUTHORIZED_VIEWERS_MSG = {
  max: `You can only allow ${AUTHORIZED_VIEWERS_MAX} people to be a viewer`
}

export const APPLIED_BOOSTER_MAX = 5;
export const APPLIED_BOOSTER_MIN = 0;
