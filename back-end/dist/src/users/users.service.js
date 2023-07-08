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
            secure: false,
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
    async findByVerificationOR(user_email, user_cpf) {
        const find = await this.usersRepository.find({
            where: [{ user_email }, { user_cpf }],
        });
        return find;
    }
    ;
    async findByVerificationAND(user_email, user_cpf) {
        const find = await this.usersRepository.find({
            where: { user_email, user_cpf },
        });
        return find;
    }
    ;
    async create(user) {
        const { user_cpf, user_email, user_firstName, user_lastName } = user;
        const find = await this.findByVerificationOR(user_email, user_cpf);
        if (find.length > 0) {
            throw new common_1.HttpException('Já existe um usuário cadastrado com este cpf ou e-mail', 400);
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
    }
    ;
    async login(user) {
        const { user_email, user_password } = user;
        const find = await this.findByLogin(user_email, user_password);
        if (find.length === 0) {
            throw new common_1.HttpException('Usuário ou Senha Inválidos', 200);
        }
        else {
            return find[0];
        }
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
            const register = await this.usersRepository.save(preload);
            await this.sendEmail(find[0].user_email, user_password);
            return register;
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
    async update(body) {
        const find = await this.findByVerificationAND(body.user_email, body.user_cpf);
        const verifyNewData = await this.findByVerificationOR(body.new_email, body.new_cpf);
        if (find.length === 0) {
            throw new common_1.HttpException('Usuário não encontrado.', 400);
        }
        else if (verifyNewData.length > 0 && body.new_email !== body.user_email) {
            throw new common_1.HttpException('Não é possível atualizar o cpf ou e-mail para os que foram informados.', 400);
        }
        else {
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
            }
            catch (error) {
                return error;
            }
        }
    }
    ;
    async remove(user_email, user_cpf) {
        const find = await this.findByVerificationAND(user_email, user_cpf);
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