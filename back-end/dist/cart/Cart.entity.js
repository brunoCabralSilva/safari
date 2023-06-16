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
const products_entity_1 = require("../products/products.entity");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
let Cart = class Cart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Cart.prototype, "cart_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default),
    __metadata("design:type", users_entity_1.default)
], Cart.prototype, "cart_user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.default),
    __metadata("design:type", products_entity_1.default)
], Cart.prototype, "cart_product_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cart.prototype, "cart_product_quantity", void 0);
Cart = __decorate([
    (0, typeorm_1.Entity)('cart')
], Cart);
exports.default = Cart;
//# sourceMappingURL=Cart.entity.js.map