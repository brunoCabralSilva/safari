"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bought1686887804211 = void 0;
const typeorm_1 = require("typeorm");
class Bought1686887804211 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'bought',
            columns: [
                {
                    name: 'bought_id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'bought_user_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'bought_product_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'bought_product_quantity',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createForeignKey("bought", new typeorm_1.TableForeignKey({
            columnNames: ["bought_user_id"],
            referencedColumnNames: ["user_id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("bought", new typeorm_1.TableForeignKey({
            columnNames: ["bought_product_id"],
            referencedColumnNames: ["product_id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('bought');
    }
}
exports.Bought1686887804211 = Bought1686887804211;
//# sourceMappingURL=1686887804211-Bought.js.map