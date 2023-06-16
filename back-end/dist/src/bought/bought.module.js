"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoughtModule = void 0;
const common_1 = require("@nestjs/common");
const bought_service_1 = require("./bought.service");
const typeorm_1 = require("@nestjs/typeorm");
const Bought_entity_1 = require("./Bought.entity");
const bought_controller_1 = require("./bought.controller");
const users_entity_1 = require("../users/users.entity");
const products_entity_1 = require("../products/products.entity");
let BoughtModule = class BoughtModule {
};
BoughtModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Bought_entity_1.default, users_entity_1.default, products_entity_1.default])],
        providers: [bought_service_1.BoughtService],
        controllers: [bought_controller_1.BoughtController],
    })
], BoughtModule);
exports.BoughtModule = BoughtModule;
//# sourceMappingURL=bought.module.js.map