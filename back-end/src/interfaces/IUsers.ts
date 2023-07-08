export interface IEmail {
  user_email: string;
}

export interface MailtrapTransporter {
  host: string;
}

export interface IMessage {
  message: string;
}

export interface IToken {
  token: string;
}

export interface IValidationToken {
  auth: boolean;
}

export interface ILogin {
  user_email: string;
  user_password: string;
}

export interface IVerify {
  user_email: string;
  user_cpf: string;
}

export interface IMessageAndData {
  message: string;
  user_cpf: string;
  user_firstName: string;
	user_lastName: string;
  user_email: string;
  user_password: string;
  user_DateOfBirth: Date;
}

export interface IUser {
  user_id: string;
  user_cpf: string;
  user_firstName: string;
	user_lastName: string;
  user_email: string;
  user_password: string;
  user_DateOfBirth: Date;
  user_type: string;
}

export interface IUserLoginResponse {
  user_id: string,
  user_type: string,
  user_email: string,
  user_firstName: string,
  user_lastName: string,
  user_DateOfBirth: Date,
  token: string,
}

export interface IChangePassword {
  user_email: string,
  code_email: string,
  new_password: string,
}

export interface IReqUser {
  user_firstName: string;
	user_lastName: string;
  user_email: string;
  user_DateOfBirth: Date;
  user_type: string,
}

export interface IUpdateUser {
  user_email: string,
	user_cpf: string,
	new_cpf: string,
  new_firstName: string,
  new_lastName: string,
  new_email: string,
  new_password: string,
  new_DateOfBirth: Date,
}

export interface IDecode {
  user_email: string,
  user_firstName: string,
  user_lastName: string,
  user_DateOfBirth: Date,
  user_type: string,
}