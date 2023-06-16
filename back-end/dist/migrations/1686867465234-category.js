"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category1686867465234 = void 0;
const typeorm_1 = require("typeorm");
class Category1686867465234 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'category',
            columns: [
                {
                    name: 'category_id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'category_name',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('category');
    }
}
exports.Category1686867465234 = Category1686867465234;
//# sourceMappingURL=1686867465234-category.js.map