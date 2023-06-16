import { UsersService } from './users.service';
import { IChangePassword, ILogin, IUser } from 'src/interfaces/IUsers';
export declare class UsersController {
    private readonly userService;
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
    authentication(): Promise<void>;
    decode(): Promise<void>;
    read(): Promise<void>;
    update(): Promise<void>;
    remove(): Promise<void>;
}
