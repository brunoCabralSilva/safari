import { ILogin, IUpdateUser, IUser } from '../interfaces/IUsers';
import { Repository } from 'typeorm';
import Users from './users.entity';
export declare class UsersService {
    private usersRepository;
    private token;
    constructor(usersRepository: Repository<Users>);
    sendEmail(email: string, tokenReset: string): Promise<void>;
    findByLogin(user_email: string, user_password: string): Promise<IUser[]>;
    findByVerificationOR(user_email: string, user_cpf: string): Promise<Users[]>;
    findByVerificationAND(user_email: string, user_cpf: string): Promise<Users[]>;
    create(user: IUser): Promise<IUser>;
    login(user: ILogin): Promise<IUser>;
    resetPassword(user_email: string, user_password: string): Promise<IUser>;
    read(): Promise<IUser[]>;
    update(body: IUpdateUser): Promise<IUser>;
    remove(user_email: string, user_cpf: string): Promise<boolean>;
}
