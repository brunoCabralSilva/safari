"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationUsersCategory = void 0;
const typeorm_1 = require("typeorm");
const _1686887804211_Bought_1 = require("./1686887804211-Bought");
const _1686887810364_Cart_1 = require("./1686887810364-Cart");
exports.MigrationUsersCategory = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'safari_bd',
    entities: ['dist/**/*.entity.js'],
    migrations: [
        _1686887804211_Bought_1.Bought1686887804211,
        _1686887810364_Cart_1.Cart1686887810364,
    ],
});
//# sourceMappingURL=MigrationCartBought.js.map