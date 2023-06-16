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
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: Date,
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
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: new Date(''),
    };

    this.jwtSecret = process.env.JWT_SECRET;
  }
  
  generateToken = (email: string, firstName: string, lastName: string, dateOfBirth: Date): any => {
    this.payload = { email, firstName, lastName, dateOfBirth };

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
      firstName: ver.firstName,
      lastName: ver.lastName,
      dateOfBirth: ver.dateOfBirth,
      email: ver.email,
    };
    } catch( error) {
      return {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
      };
    }
  };
};