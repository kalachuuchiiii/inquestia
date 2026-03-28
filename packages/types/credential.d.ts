
export type CredentialDTO = {
    role: Role;
    password: string;
    email: string;
    userId: string;
    _id: string;
};
export type LoginForm = Pick<CredentialDTO, 'email' | 'password'>;
export type RegisterForm = LoginForm & {
    username: string;
    hasAcceptedPrivacyPolicy: boolean;
    code: string;
};
export type SessionResponse = {
    user: UserDTO;
    accessToken: string;
    hasUnreadNotifications: boolean;
    success: boolean;
};
