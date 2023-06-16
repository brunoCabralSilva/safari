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
Object.defineProperty(exports, "__esModule", { value: true });
const Bought_entity_1 = require("../bought/Bought.entity");
const Cart_entity_1 = require("../cart/Cart.entity");
const typeorm_1 = require("typeorm");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "user_cpf", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "user_firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "user_lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Users.prototype, "user_DateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "user_email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Users.prototype, "user_password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cart_entity_1.default, cart => cart.cart_user_id),
    __metadata("design:type", Array)
], Users.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Bought_entity_1.default, bought => bought.bought_user_id),
    __metadata("design:type", Array)
], Users.prototype, "bought", void 0);
Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
exports.default = Users;
//# sourceMappingURL=users.entity.js.map