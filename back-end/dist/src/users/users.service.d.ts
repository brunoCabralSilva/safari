import { ILogin, IUpdateUser, IUser, IUserLoginResponse } from '../interfaces/IUsers';
import { Repository } from 'typeorm';
import Users from './users.entity';
export declare class UsersService {
    private usersRepository;
    private token;
    constructor(usersRepository: Repository<Users>);
    sendEmail(email: string, tokenReset: string): Promise<void>;
    findByLogin(user_email: string, user_password: string): Promise<Users[]>;
    findByVerificationOR(user_email: string, user_cpf: string): Promise<Users[]>;
    findByVerificationAND(user_email: string, user_cpf: string): Promise<Users[]>;
    create(user: IUser): Promise<IUserLoginResponse>;
    login(user: ILogin): Promise<IUserLoginResponse>;
    resetPassword(user_email: string, user_password: string): Promise<any>;
    read(): Promise<Users[]>;
    update(body: IUpdateUser): Promise<any>;
    remove(user_email: string, user_cpf: string): Promise<boolean>;
}
