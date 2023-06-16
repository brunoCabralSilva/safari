import { Body, Controller, Delete, Get, HttpException, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IChangePassword, ILogin, IUser, IVerify } from 'src/interfaces/IUsers';
import ValidationToken from 'ValidationToken';

@Controller('users')
export class UsersController {
  private token: ValidationToken;

  constructor(private readonly userService: UsersService) {
    this.token = new ValidationToken();
  }

  randomString () {
    let stringAleatoria: string = '';
    const caracteres: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i += 1) {
      stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
  };

  @Post('create')
  async create(@Body() body: IUser) {
    return this.userService.create(body);
  };

  @Post('login')
  async login(@Body() body: ILogin) {
    return this.userService.login(body);
  };
  
  @Post('reset-password')
  async resetPassword(@Body() body: { user_email: string }) {
    const tokenReset = this.randomString().toUpperCase();
    const reset = await this.userService.resetPassword(body.user_email, tokenReset);
    if (reset)
      return { message: 'Uma mensagem de verificação foi enviada para o seu e-mail. Utilize as diretrizes enviadas para recuperar sua senha' };
  };

  @Post('change-password')
  async changePassword(@Body() body: IChangePassword) {
    const find = await this.userService.findByLogin(body.user_email, body.code_email);

    if (find.length > 0) {
      try {
        const change: boolean = await this.userService.resetPassword(body.user_email, body.new_password);

        if (change) {
          return ({ message: "Senha alterada com sucesso, redirecionando..." });
        } 
        throw new HttpException({ message: "Não foi possível alterar a senha do usuário" }, 400);
      } catch(error) {
        throw new HttpException({ message: `Não foi possível alterar a senha do usuário (${error})` }, 400);
      }
    }
  };

  @Post('email')
  async findByEmail() {
      
  };

  @Post('authentication')
  async authentication(@Body() body: { token: string }) {
    const { token } = body;
    const verifyUser: boolean = this.token.verify(token);
    return { auth: verifyUser };
  };

  @Post('decode')
  async decode(@Body() body: { token: string }) {
    const { token } = body;

    const verifyUser = await this.token.decode(token);
    
    return {
      user_firstName: verifyUser.firstName,
      user_lastName: verifyUser.lastName,
      user_email: verifyUser.email,
      user_DateOfBirth: verifyUser.dateOfBirth,
    };
  };

  @Get()
  async read() {
    return await this.userService.read();
  };

  @Patch('update')
  async update() {
     
  };

  @Delete('remove')
  async remove(@Body() body: IVerify) {
    const { user_email, user_cpf } = body;
    const removeUser = await this.userService.remove(user_email, user_cpf);
    if (removeUser) {
      return { message: `Usuário ${user_email} removido com sucesso!` }
    } return { message: 'Não foi possível remover usuário. Por favor, tente novamente.' }
  };
}
