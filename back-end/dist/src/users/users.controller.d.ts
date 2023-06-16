import { UsersService } from './users.service';
import { IChangePassword, ILogin, IUpdateUser, IUser, IVerify } from 'src/interfaces/IUsers';
export declare class UsersController {
    private readonly userService;
    private token;
    constructor(userService: UsersService);
    randomString(): string;
    create(body: IUser): Promise<import("src/interfaces/IUsers").IUserLoginResponse>;
    login(body: ILogin): Promise<import("src/interfaces/IUsers").IUserLoginResponse>;
    resetPassword(body: {
        user_email: string;
    }): Promise<{
        message: string;
    }>;
    changePassword(body: IChangePassword): Promise<{
        message: string;
    }>;
    findByEmail(): Promise<void>;
    authentication(body: {
        token: string;
    }): Promise<{
        auth: boolean;
    }>;
    decode(body: {
        token: string;
    }): Promise<{
        user_firstName: string;
        user_lastName: string;
        user_email: string;
        user_DateOfBirth: string;
    }>;
    read(): Promise<import("./users.entity").default[]>;
    update(body: IUpdateUser): Promise<{
        message: string;
        updateUser: any;
    } | {
        message: string;
        updateUser?: undefined;
    }>;
    remove(body: IVerify): Promise<{
        message: string;
    }>;
}
