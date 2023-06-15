"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products1686865702095 = void 0;
const typeorm_1 = require("typeorm");
class Products1686865702095 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'products',
            columns: [
                {
                    name: 'product_id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'product_name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'product_value',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'product_description',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'product_image',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'product_category',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'product_size',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'product_weight',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('products');
    }
}
exports.Products1686865702095 = Products1686865702095;
//# sourceMappingURL=1686865702095-products.js.map