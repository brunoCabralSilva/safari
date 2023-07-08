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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const ValidationToken_1 = require("../../ValidationToken");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
        this.token = new ValidationToken_1.default();
    }
    randomString() {
        let stringAleatoria = '';
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 6; i += 1) {
            stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return stringAleatoria;
    }
    ;
    generationDataWithToken(createUser) {
        const newToken = this.token.generateToken(createUser.user_email, createUser.user_firstName, createUser.user_lastName, createUser.user_DateOfBirth, createUser.user_type);
        return {
            user_id: createUser.user_id,
            user_email: createUser.user_email,
            user_firstName: createUser.user_firstName,
            user_lastName: createUser.user_lastName,
            user_DateOfBirth: createUser.user_DateOfBirth,
            user_type: createUser.user_type,
            token: newToken,
        };
    }
    async create(body) {
        const createUser = await this.userService.create(body);
        return this.generationDataWithToken(createUser);
    }
    ;
    async login(body) {
        const loginUser = await this.userService.login(body);
        return this.generationDataWithToken(loginUser);
    }
    ;
    async resetPassword(body) {
        const tokenReset = this.randomString().toUpperCase();
        const reset = await this.userService.resetPassword(body.user_email, tokenReset);
        if (reset) {
            return { message: 'Uma mensagem de verificação foi enviada para o seu e-mail. Utilize as diretrizes enviadas para recuperar sua senha.' };
        }
        return { message: "Não foi possível enviar um e-mail de verificação. Por favor, tente novamente." };
    }
    ;
    async changePassword(body) {
        const find = await this.userService.findByLogin(body.user_email, body.code_email);
        if (find.length > 0) {
            try {
                const change = await this.userService.resetPassword(body.user_email, body.new_password);
                if (change) {
                    const newToken = this.token.generateToken(change.user_email, change.user_firstName, change.user_lastName, change.user_DateOfBirth, change.user_type);
                    return (Object.assign(Object.assign({ message: "Senha alterada com sucesso, redirecionando..." }, change), { token: newToken }));
                }
                throw new common_1.HttpException({ message: "Não foi possível alterar a senha do usuário" }, 400);
            }
            catch (error) {
                throw new common_1.HttpException({ message: `Não foi possível alterar a senha do usuário (${error})` }, 400);
            }
        }
    }
    ;
    async authentication(body) {
        const { token } = body;
        const verifyUser = this.token.verify(token);
        return { auth: verifyUser };
    }
    ;
    async decode(body) {
        const { token } = body;
        const verifyUser = await this.token.decode(token);
        return {
            user_firstName: verifyUser.user_firstName,
            user_lastName: verifyUser.user_lastName,
            user_email: verifyUser.user_email,
            user_DateOfBirth: verifyUser.user_DateOfBirth,
            user_type: verifyUser.user_type,
        };
    }
    ;
    async read() {
        return await this.userService.read();
    }
    ;
    async update(body) {
        const { user_email } = body;
        const updateUser = await this.userService.update(body);
        if (updateUser) {
            return Object.assign({ message: `Usuário ${user_email} atualizado com sucesso!` }, updateUser);
        }
        return { message: 'Não foi possível atualizar usuário. Por favor, tente novamente.' };
    }
    ;
    async remove(body) {
        const { user_email, user_cpf } = body;
        const removeUser = await this.userService.remove(user_email, user_cpf);
        if (removeUser) {
            return { message: `Usuário ${user_email} removido com sucesso!` };
        }
        return { message: 'Não foi possível remover usuário. Por favor, tente novamente.' };
    }
    ;
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('authentication'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "authentication", null);
__decorate([
    (0, common_1.Post)('decode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "decode", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "read", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map