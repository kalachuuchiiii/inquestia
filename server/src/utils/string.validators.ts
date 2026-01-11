export const textValidator = (value: string): boolean =>
  /^[a-zA-Z0-9._]+$/.test(value);

export const emailValidator = (value: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
};

export const nicknameValidator = (value: string): boolean => {
  return /^(?!.*  )[a-zA-Z0-9._ ]+$/.test(value);
};

type LengthCheckerOptions = {
  key?: string | null;
  min?: number;
  max?: number;
  required?: boolean;
};

export const lengthChecker = (
  value: string = "",
  {
    key = null,
    min = 0,
    max = 100,
    required = false,
  }: LengthCheckerOptions
): string | void => {
  if (!key) {
    console.warn("Key is a must to proceed");
    return;
  }

  if (!value && required) {
    throw new Error(`${key} cannot be empty.`);
  }

  if (typeof value !== "string") {
    throw new Error(`${value} is not avalid string`);
  }

  value = value.trim();

  if (value.length < min) {
    throw new Error(`${key} must be atleast ${min} characters.`);
  }

  if (value.length > max) {
    throw new Error(`${key} must not exceed ${max} characters.`);
  }

  return value;
};

