"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_module_1 = require("./products/products.module");
const users_module_1 = require("./users/users.module");
const category_module_1 = require("./category/category.module");
const bought_controller_1 = require("./bought/bought.controller");
const bought_module_1 = require("./bought/bought.module");
const cart_service_1 = require("./cart/cart.service");
const cart_module_1 = require("./cart/cart.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            products_module_1.ProductsModule,
            users_module_1.UsersModule,
            cart_module_1.CartModule,
            bought_module_1.BoughtModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3307,
                username: 'root',
                password: 'root',
                database: 'safari_bd',
                entities: ['dist/**/*.entity.js'],
                migrations: ['migrations/*.ts'],
            }),
            users_module_1.UsersModule,
            category_module_1.CategoryModule,
            bought_module_1.BoughtModule,
            cart_module_1.CartModule
        ],
        controllers: [bought_controller_1.BoughtController],
        providers: [cart_service_1.CartService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map