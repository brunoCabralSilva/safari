import { UsersService } from './users.service';
import { IChangePassword, IEmail, ILogin, IMessage, IMessageAndData, IReqUser, IToken, IUpdateUser, IUser, IUserLoginResponse, IValidationToken, IVerify } from 'src/interfaces/IUsers';
export declare class UsersController {
    private readonly userService;
    private token;
    constructor(userService: UsersService);
    randomString(): string;
    generationDataWithToken(createUser: IUser): {
        user_id: string;
        user_email: string;
        user_firstName: string;
        user_lastName: string;
        user_DateOfBirth: Date;
        user_type: string;
        token: string;
    };
    create(body: IUser): Promise<IUserLoginResponse>;
    login(body: ILogin): Promise<any>;
    resetPassword(body: IEmail): Promise<IMessage>;
    changePassword(body: IChangePassword): Promise<any>;
    authentication(body: IToken): Promise<IValidationToken>;
    decode(body: IToken): Promise<IReqUser>;
    read(): Promise<IUser[] | []>;
    update(body: IUpdateUser): Promise<IMessageAndData | IMessage>;
    remove(body: IVerify): Promise<IMessage>;
}
