export interface LoginResponse {
    auth: boolean;
    token: string;
    user: {
        userId: string;
        name: string;
        email: string;
        phone: string;
        role: string;
    };
};
