"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const md5 = require("md5");
const ValidationToken_1 = require("../../ValidationToken");
dotenv.config();
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.token = new ValidationToken_1.default();
    }
    async sendEmail(email, tokenReset) {
        const connection = nodemailer.createTransport({
            host: process.env.SMTP,
            port: process.env.PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await connection.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Alteração de senha do Safari",
            text: `Houve uma solicitação para alterar a sua senha. Utilize o código ${tokenReset} `
        });
    }
    ;
    async findByLogin(user_email, user_password) {
        const find = await this.usersRepository.find({
            where: {
                user_email,
                user_password: md5(user_password),
            },
        });
        return find;
    }
    ;
    async create(user) {
        const { user_cpf, user_email, user_firstName, user_lastName } = user;
        const find = await this.usersRepository.find({
            where: { user_email, user_cpf },
        });
        if (find.length > 0) {
            throw new common_1.HttpException('Já existe um usuário cadastrado com este cpf ou e-mail.', 400);
        }
        const register = await this.usersRepository.save({
            user_cpf,
            user_email,
            user_DateOfBirth: new Date(user.user_DateOfBirth),
            user_password: md5(user.user_password),
            user_firstName,
            user_lastName,
        });
        const newToken = this.token.generateToken(register.user_email, register.user_firstName, register.user_lastName, register.user_DateOfBirth);
        return {
            user_id: register.user_id,
            user_cpf: register.user_cpf,
            user_email: register.user_email,
            user_firstName: register.user_firstName,
            user_lastName: register.user_lastName,
            user_DateOfBirth: register.user_DateOfBirth,
            token: newToken,
        };
    }
    ;
    async login(user) {
        const { user_email, user_password } = user;
        const find = await this.findByLogin(user_email, user_password);
        if (find.length === 0) {
            throw new common_1.HttpException('Usuário ou Senha Inválidos.', 400);
        }
        const newToken = this.token.generateToken(find[0].user_email, find[0].user_firstName, find[0].user_lastName, find[0].user_DateOfBirth);
        return {
            user_id: find[0].user_id,
            user_cpf: find[0].user_cpf,
            user_email: find[0].user_email,
            user_firstName: find[0].user_firstName,
            user_lastName: find[0].user_lastName,
            user_DateOfBirth: find[0].user_DateOfBirth,
            token: newToken,
        };
    }
    ;
    async resetPassword(user_email, user_password) {
        const find = await this.usersRepository.find({
            where: { user_email },
        });
        if (find.length === 0) {
            throw new common_1.HttpException('Usuário não encontrado.', 400);
        }
        try {
            const preload = await this.usersRepository.preload(Object.assign(Object.assign({}, find[0]), { user_password: md5(user_password) }));
            await this.usersRepository.save(preload);
            await this.sendEmail(find[0].user_email, user_password);
            return true;
        }
        catch (error) {
            throw new common_1.HttpException(error, 400);
        }
    }
    ;
    async read() {
        return await this.usersRepository.find();
    }
    ;
    async update() {
    }
    ;
    async remove(user_email, user_cpf) {
        const find = await this.usersRepository.find({
            where: { user_email, user_cpf },
        });
        if (find.length === 0) {
            throw new common_1.HttpException('Usuário não encontrado.', 400);
        }
        try {
            await this.usersRepository.remove(find);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    ;
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map