export interface LoginResponse {
    auth: boolean;
    token: string;
    user: {
        userId: string;
        email: string;
        role: string;
    };
};
