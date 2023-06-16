import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { IDecode } from 'src/interfaces/IUsers';
import jwt_decode from "jwt-decode";

dotenv.config();

interface IJwtConfig {
  expiresIn: string,
  subject: string,
}

interface IPayload {
  user_firstName: string,
  user_lastName: string,
  user_email: string,
  user_DateOfBirth: Date,
}

export default class ValidationToken {
  private payload: IPayload;
  private jwtSecret: string;
  private jwtConfig: IJwtConfig;

  constructor() {

    this.jwtConfig = {
      expiresIn: '120min',
      subject: '1',
    };

    this.payload = {
      user_email: '',
      user_firstName: '',
      user_lastName: '',
      user_DateOfBirth: new Date(''),
    };

    this.jwtSecret = process.env.JWT_SECRET;
  }
  
  generateToken = (
    user_email: string,
    user_firstName: string,
    user_lastName: string,
    user_DateOfBirth: Date,
  ) => {
    this.payload = {
      user_email,
      user_firstName,
      user_lastName,
      user_DateOfBirth,
    };

    const json = jwt.sign(this.payload, this.jwtSecret, this.jwtConfig);

    return json;
  };

  verify = (token: string): boolean => {
    try {
      const ver = jwt.verify(token, this.jwtSecret);
      if (ver) { return true }
      return false;
    } catch( error) {
      return false;
    }
  };

  decode = async (token: string) => {
    try {
    const ver: IDecode = jwt_decode(token);
    return {
      user_firstName: ver.user_firstName,
      user_lastName: ver.user_lastName,
      user_DateOfBirth: ver.user_DateOfBirth,
      user_email: ver.user_email,
    };
    } catch( error) {
      return {
        user_firstName: '',
        user_lastName: '',
        user_DateOfBirth: new Date(''),
        user_email: '',
      };
    }
  };
};