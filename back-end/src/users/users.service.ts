import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILogin, IUser, IUserLoginResponse, MailtrapTransporter } from '../interfaces/IUsers';
import { Repository } from 'typeorm';
import Users from './users.entity';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as md5 from 'md5';
import ValidationToken from 'ValidationToken';

dotenv.config();

@Injectable()
export class UsersService {
  private token: ValidationToken;

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {
    this.token = new ValidationToken();
  }

  async sendEmail(email: string, tokenReset: string): Promise<void> {
    const connection = nodemailer.createTransport({
      host: process.env.SMTP,
      port: process.env.PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    } as MailtrapTransporter);

    await connection.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Alteração de senha do Safari",
      text: `Houve uma solicitação para alterar a sua senha. Utilize o código ${tokenReset} `
    });
  };

  async findByLogin(user_email: string, user_password: string) {
    const find = await this.usersRepository.find({
      where: {
        user_email,
        user_password: md5(user_password),
      },
    });
    return find;
  };

  async create(user: IUser): Promise<IUserLoginResponse> {
    const { user_cpf, user_email, user_firstName, user_lastName } = user;

    const find = await this.usersRepository.find({
      where: { user_email, user_cpf },
    });

    if (find.length > 0) {
      throw new HttpException('Já existe um usuário cadastrado com este cpf ou e-mail.', 400);
    }
    
    const register = await this.usersRepository.save({
      user_cpf,
      user_email,
      user_DateOfBirth: new Date(user.user_DateOfBirth),
      user_password: md5(user.user_password),
      user_firstName,
      user_lastName,
    });

    const newToken = this.token.generateToken(
      register.user_email,
      register.user_firstName,
      register.user_lastName,
      register.user_DateOfBirth,
    );

    return {
      user_id: register.user_id,
      user_cpf: register.user_cpf,
      user_email: register.user_email,
      user_firstName: register.user_firstName,
      user_lastName: register.user_lastName,
      user_DateOfBirth: register.user_DateOfBirth,
      token: newToken,
    };
  };

  async login(user: ILogin): Promise<IUserLoginResponse> {
    const { user_email, user_password } = user;

    const find = await this.findByLogin(user_email, user_password);

    if (find.length === 0) {
      throw new HttpException('Usuário ou Senha Inválidos.', 400);
    }

    const newToken = this.token.generateToken(
      find[0].user_email,
      find[0].user_firstName,
      find[0].user_lastName,
      find[0].user_DateOfBirth,
    );

    return {
      user_id: find[0].user_id,
      user_cpf: find[0].user_cpf,
      user_email: find[0].user_email,
      user_firstName: find[0].user_firstName,
      user_lastName: find[0].user_lastName,
      user_DateOfBirth: find[0].user_DateOfBirth,
      token: newToken,
    };
  };
  
  async resetPassword(user_email:string, user_password: string): Promise<boolean> {
    const find = await this.usersRepository.find({
      where: { user_email },
    });

    if(find.length === 0) {
      throw new HttpException('Usuário não encontrado.', 400);
    }

    try {
    const preload = await this.usersRepository.preload({
      ...find[0],
      user_password: md5(user_password),
    });

    await this.usersRepository.save(preload);
    await this.sendEmail(find[0].user_email, user_password);

    return true;

    } catch(error) {
      throw new HttpException(error, 400);
    }
  };

  async read() {
    return await this.usersRepository.find();  
  };

  async update() {
      
  };

  async remove(user_email: string, user_cpf: string) {
    const find = await this.usersRepository.find({
      where: { user_email, user_cpf },
    });
    if (find.length === 0) {
      throw new HttpException('Usuário não encontrado.', 400);
    }
    try {
      await this.usersRepository.remove(find);
      return true;
    } catch(error) {
      return false
    }
  };
}
