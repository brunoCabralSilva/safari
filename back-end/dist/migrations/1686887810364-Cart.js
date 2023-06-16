"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart1686887810364 = void 0;
const typeorm_1 = require("typeorm");
class Cart1686887810364 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'cart',
            columns: [
                {
                    name: 'cart_id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'cart_user_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'cart_product_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'cart_product_quantity',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));
        await queryRunner.createForeignKey("cart", new typeorm_1.TableForeignKey({
            columnNames: ["cart_user_id"],
            referencedColumnNames: ["user_id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("cart", new typeorm_1.TableForeignKey({
            columnNames: ["cart_product_id"],
            referencedColumnNames: ["product_id"],
            referencedTableName: "products",
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('cart');
    }
}
exports.Cart1686887810364 = Cart1686887810364;
//# sourceMappingURL=1686887810364-Cart.js.map