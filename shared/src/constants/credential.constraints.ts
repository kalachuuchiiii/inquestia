
export const ROLE_ENUM = ['admin', 'user'] as const;

export const INVALID_CREDENTIALS_MSG = 'Incorrect email or password.'
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 30;

export const IMPLICIT_EMAIL_MSG = {
    invalid: INVALID_CREDENTIALS_MSG,
}

export const TOKEN_MSG = {
    invalid: 'Invalid Token.',
    expired: 'Token has expired'
}

export const IMPLICIT_PASSWORD_MSG = {
    invalid: INVALID_CREDENTIALS_MSG,
    min: INVALID_CREDENTIALS_MSG,
    max: INVALID_CREDENTIALS_MSG
}

export const EXPLICIT_EMAIL_MSG = {
    invalid: "Email must be a valid address (for example: name@example.com).",
}

export const MUST_ACCEPT_PRIVACY_POLICY = true;
export const MUST_ACCEPT_PRIVACY_POLICY_MSG = {
    invalid: 'You must accept the Privacy Policy to continue.'
}

export const EXPLICIT_PASSWORD_MSG = {
    invalid: "Password must contain only letters and numbers.",
    min: `Password must be at least ${PASSWORD_MIN} characters.`,
    max: `Password must be at most ${PASSWORD_MIN} characters.`
}



