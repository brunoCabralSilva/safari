import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Cart1686887810364 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );

    await queryRunner.createForeignKey(
      "cart",
      new TableForeignKey({
          columnNames: ["cart_user_id"],
          referencedColumnNames: ["user_id"],
          referencedTableName: "users",
          onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "cart",
      new TableForeignKey({
          columnNames: ["cart_product_id"],
          referencedColumnNames: ["product_id"],
          referencedTableName: "products",
          onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart');
  }
}
