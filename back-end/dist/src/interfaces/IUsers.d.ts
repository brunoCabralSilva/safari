export interface ILogin {
    user_email: string;
    user_password: string;
}
export interface IEmail {
    email: string;
}
export interface MailtrapTransporter {
    host: string;
}
export interface IUser {
    user_cpf: string;
    user_firstName: string;
    user_lastName: string;
    user_email: string;
    user_password: string;
    user_DateOfBirth: string;
}
export interface IUserLoginResponse {
    user_id: string;
    user_cpf: string;
    user_email: string;
    user_firstName: string;
    user_lastName: string;
    user_DateOfBirth: Date;
    token: string;
}
export interface IChangePassword {
    user_email: string;
    code_email: string;
    new_password: string;
}
export interface IReqUser {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}
