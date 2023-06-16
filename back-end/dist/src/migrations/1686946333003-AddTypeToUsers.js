"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTypeToUsers1686946333003 = void 0;
const typeorm_1 = require("typeorm");
class AddTypeToUsers1686946333003 {
    async up(queryRunner) {
        await queryRunner.addColumn("users", new typeorm_1.TableColumn({
            name: 'user_type',
            type: 'varchar',
            isNullable: true
        }));
    }
    async down(queryRunner) {
    }
}
exports.AddTypeToUsers1686946333003 = AddTypeToUsers1686946333003;
//# sourceMappingURL=1686946333003-AddTypeToUsers.js.map