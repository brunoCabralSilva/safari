import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ILogin,
  IUpdateUser,
  IUser,
  MailtrapTransporter
} from '../interfaces/IUsers';
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
      secure: false,
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

  async findByLogin(user_email: string, user_password: string): Promise<IUser[]> {
    const find = await this.usersRepository.find({
      where: {
        user_email,
        user_password: md5(user_password),
      },
    });
    return find;
  };

  async findByVerificationOR(user_email: string, user_cpf: string) {
    const find = await this.usersRepository.find({
      where: [ { user_email }, { user_cpf } ],
    });
    return find;
  };

  async findByVerificationAND(user_email: string, user_cpf: string) {
    const find = await this.usersRepository.find({
      where: { user_email , user_cpf },
    });
    return find;
  };

  async create(user: IUser): Promise<IUser> {
    const { user_cpf, user_email, user_firstName, user_lastName } = user;

    const find = await this.findByVerificationOR(user_email, user_cpf);

    if (find.length > 0) {
      throw new HttpException('Já existe um usuário cadastrado com este cpf ou e-mail', 400);
    }
    
    const register = await this.usersRepository.save({
      user_cpf,
      user_email,
      user_DateOfBirth: new Date(user.user_DateOfBirth),
      user_password: md5(user.user_password),
      user_firstName,
      user_lastName,
      user_type: 'buyer',
    });

    return register;
  };

  async login(user: ILogin): Promise<IUser> {
    const { user_email, user_password } = user;

    const find = await this.findByLogin(user_email, user_password);

    if (find.length === 0) {
      throw new HttpException('Usuário ou Senha Inválidos', 200);
    } else {
      return find[0];
    }
  };
  
  async resetPassword(user_email:string, user_password: string): Promise<IUser> {
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

    const register = await this.usersRepository.save(preload);
    await this.sendEmail(find[0].user_email, user_password);

    return register;

    } catch(error) {
      throw new HttpException(error, 400);
    }
  };

  async read(): Promise<IUser[]> {
    return await this.usersRepository.find();  
  };

  async update(body: IUpdateUser): Promise<IUser> {
    const find = await this.findByVerificationAND(body.user_email, body.user_cpf);

    const verifyNewData = await this.findByVerificationOR(body.new_email, body.new_cpf);

    if (find.length === 0) {
      throw new HttpException('Usuário não encontrado.', 400);
    } else if (verifyNewData.length > 0 && body.new_email !== body.user_email) {
      throw new HttpException('Não é possível atualizar o cpf ou e-mail para os que foram informados.', 400);
    } else {    
      try {
        const preload = await this.usersRepository.preload({
          user_id: find[0].user_id,
          user_cpf: body.new_cpf,
          user_firstName: body.new_firstName,
          user_lastName: body.new_lastName,
          user_email: body.new_email,
          user_password: md5(body.new_password),
          user_DateOfBirth: body.new_DateOfBirth,
          user_type: 'buyer',
        });
        return await this.usersRepository.save(preload);
      } catch(error) {
        return error;
      }
    }
  };

  async remove(user_email: string, user_cpf: string): Promise<boolean> {
    const find = await this.findByVerificationAND(user_email, user_cpf);

    if (find.length === 0) {
      throw new HttpException('Usuário não encontrado.', 400);
    }
    try {
      await this.usersRepository.remove(find);
      return true;
    } catch(error) {
      return false;
    }
  };
}
