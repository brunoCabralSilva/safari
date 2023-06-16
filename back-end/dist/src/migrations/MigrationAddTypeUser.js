"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationProducts = void 0;
const typeorm_1 = require("typeorm");
const _1686946333003_AddTypeToUsers_1 = require("./1686946333003-AddTypeToUsers");
exports.MigrationProducts = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'safari_bd',
    entities: ['dist/**/*.entity.js'],
    migrations: [
        _1686946333003_AddTypeToUsers_1.AddTypeToUsers1686946333003,
    ],
});
//# sourceMappingURL=MigrationAddTypeUser.js.map