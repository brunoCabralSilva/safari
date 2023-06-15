import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Products1686865702095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
