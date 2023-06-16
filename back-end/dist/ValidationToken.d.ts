export default class ValidationToken {
    private payload;
    private jwtSecret;
    private jwtConfig;
    constructor();
    generateToken: (user_email: string, user_firstName: string, user_lastName: string, user_DateOfBirth: Date) => string;
    verify: (token: string) => boolean;
    decode: (token: string) => Promise<{
        user_firstName: string;
        user_lastName: string;
        user_DateOfBirth: Date;
        user_email: string;
    }>;
}
