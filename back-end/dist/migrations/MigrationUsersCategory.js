"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationUsersCategory = void 0;
const typeorm_1 = require("typeorm");
const _1686867456481_users_1 = require("./1686867456481-users");
const _1686867465234_category_1 = require("./1686867465234-category");
exports.MigrationUsersCategory = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'safari_bd',
    entities: ['dist/**/*.entity.js'],
    migrations: [
        _1686867456481_users_1.Users1686867456481,
        _1686867465234_category_1.Category1686867465234,
    ],
});
//# sourceMappingURL=MigrationUsersCategory.js.map