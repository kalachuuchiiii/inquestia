
export const ROLE_ENUM = ['admin', 'user'] as const;

export const INVALID_CREDENTIALS_MSG = 'Invalid Credentials.';
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 30;

export const IMPLICIT_EMAIL_MSG = {
    invalid: INVALID_CREDENTIALS_MSG,
}

export const IMPLICIT_PASSWORD_MSG = {
    invalid: INVALID_CREDENTIALS_MSG,
    min: INVALID_CREDENTIALS_MSG,
    max: INVALID_CREDENTIALS_MSG
}

export const EXPLICIT_EMAIL_MSG = {
    invalid: "Email must be a valid address (for example: name@example.com).",
}

export const EXPLICIT_PASSWORD_MSG = {
    invalid: "Password must contain only letters and numbers.",
    min: `Password must be at least ${PASSWORD_MIN} characters.`,
    max: `Password must be at most ${PASSWORD_MIN} characters.`
}

