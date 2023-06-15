"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const _1686865702095_products_1 = require("./1686865702095-products");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'safari_bd',
    entities: ['dist/**/*.entity.js'],
    migrations: [_1686865702095_products_1.Products1686865702095],
});
//# sourceMappingURL=DataSource.js.map