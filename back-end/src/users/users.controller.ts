import { Body, Controller, Delete, Get, HttpException, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IChangePassword, IEmail, ILogin, IMessage, IMessageAndData, IReqUser, IToken, IUpdateUser, IUser, IUserLoginResponse, IValidationToken, IVerify } from 'src/interfaces/IUsers';
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
  async create(@Body() body: IUser): Promise<IUserLoginResponse> {
    return this.userService.create(body);
  };

  @Post('login')
  async login(@Body() body: ILogin): Promise<IUserLoginResponse> {
    return this.userService.login(body);
  };
  
  @Post('reset-password')
  async resetPassword(@Body() body: IEmail) : Promise<IMessage> {
    const tokenReset = this.randomString().toUpperCase();
    const reset = await this.userService.resetPassword(body.user_email, tokenReset);
    if (reset) {
      return { message: 'Uma mensagem de verificação foi enviada para o seu e-mail. Utilize as diretrizes enviadas para recuperar sua senha.' };
    } return { message: "Não foi possível enviar um e-mail de verificação. Por favor, tente novamente." }
  };

  @Post('change-password')
  async changePassword(@Body() body: IChangePassword): Promise<any> {
    const find = await this.userService.findByLogin(body.user_email, body.code_email);

    if (find.length > 0) {
      try {
        const change: IUser = await this.userService.resetPassword(body.user_email, body.new_password);

        if (change) {
          const newToken = this.token.generateToken(
            change.user_email,
            change.user_firstName,
            change.user_lastName,
            change.user_DateOfBirth,
          );
    
          return ({
            message: "Senha alterada com sucesso, redirecionando...",
            ...change,
            token: newToken,
          });
        } 
        throw new HttpException({ message: "Não foi possível alterar a senha do usuário" }, 400);
      } catch(error) {
        throw new HttpException({ message: `Não foi possível alterar a senha do usuário (${error})` }, 400);
      }
    }
  };
  
  @Post('authentication')
  async authentication(@Body() body: IToken): Promise<IValidationToken> {
    const { token } = body;
    const verifyUser: boolean = this.token.verify(token);
    return { auth: verifyUser };
  };

  @Post('decode')
  async decode(@Body() body: IToken): Promise<IReqUser> {
    const { token } = body;

    const verifyUser: IReqUser = await this.token.decode(token);
    
    return {
      user_firstName: verifyUser.user_firstName,
      user_lastName: verifyUser.user_lastName,
      user_email: verifyUser.user_email,
      user_DateOfBirth: verifyUser.user_DateOfBirth,
    };
  };

  @Get()
  async read(): Promise<IUser[] | []> {
    return await this.userService.read();
  };

  @Patch('update')
  async update(@Body() body: IUpdateUser): Promise<IMessageAndData | IMessage> {
    const { user_email } = body;
    const updateUser: IUser = await this.userService.update(body);
    
    if (updateUser) {
      return {
        message: `Usuário ${user_email} atualizado com sucesso!`,
        ...updateUser,
      };
    } return { message: 'Não foi possível atualizar usuário. Por favor, tente novamente.' }
  };

  @Delete('remove')
  async remove(@Body() body: IVerify): Promise<IMessage> {
    const { user_email, user_cpf } = body;
    const removeUser: boolean = await this.userService.remove(user_email, user_cpf);
    if (removeUser) {
      return { message: `Usuário ${user_email} removido com sucesso!` }
    } return { message: 'Não foi possível remover usuário. Por favor, tente novamente.' }
  };
}
