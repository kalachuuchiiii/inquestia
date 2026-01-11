export const STATUS_ENUM = ["pending", "fulfilled", "rejected"] as const;

export const INVALID_PHONE_NUMBER_MSG = "Invalid PH phone number.";

export const PHONE_NUMBER_MIN = 11;
export const PHONE_NUMBER_MAX = 11;

export const PHONE_NUMBER_MSG = {
  min: INVALID_PHONE_NUMBER_MSG,
  max: INVALID_PHONE_NUMBER_MSG,
  invalid: INVALID_PHONE_NUMBER_MSG,
};

export const AMOUNT_ENUM = [10, 20, 50, 100];
export const AMOUNT_MSG = {
    invalid: 'Invalid amount.'
}
