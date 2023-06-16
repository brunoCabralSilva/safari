import { Body, Controller, Delete, Get, HttpException, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IChangePassword, ILogin, IUser } from 'src/interfaces/IUsers';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // findUser = async (): Promise<Response> => {
  //   const { email: emailUser }: IUser = req.body;

  //   const find: IReqUser | false = await this.userService.findUser(emailUser);

  //   if (!find) return res.status(200).json({ message: "Usuário não encontrado" });
    
  //   const { _id, firstName, lastName, email, dateOfBirth } = find;

  //   return res.status(200).json({
  //     message: "Usuário localizado com sucesso",
  //     user: { _id, firstName, lastName, email, dateOfBirth },
  //   });
  // };

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
  async authentication() {
      
  };

  @Post('decode')
  async decode() {
      
  };

  @Get('reset-password')
  async read() {
      
  };

  @Patch('update')
  async update() {
      
  };

  @Delete('remove')
  async remove() {

  };
}
