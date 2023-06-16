export default class ValidationToken {
    private payload;
    private jwtSecret;
    private jwtConfig;
    constructor();
    generateToken: (email: string, firstName: string, lastName: string, dateOfBirth: Date) => any;
    verify: (token: string) => boolean;
    decode: (token: string) => Promise<void>;
}
