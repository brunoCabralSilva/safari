"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1686867456481 = void 0;
const typeorm_1 = require("typeorm");
class Users1686867456481 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'user_id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'user_cpf',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'user_firstName',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'user_lastName',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'user_DateOfBirth',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'user_email',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.Users1686867456481 = Users1686867456481;
//# sourceMappingURL=1686867456481-users.js.map