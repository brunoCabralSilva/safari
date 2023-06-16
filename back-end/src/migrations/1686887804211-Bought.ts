import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Bought1686887804211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );

    await queryRunner.createForeignKey(
      "bought",
      new TableForeignKey({
          columnNames: ["bought_user_id"],
          referencedColumnNames: ["user_id"],
          referencedTableName: "users",
          onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "bought",
      new TableForeignKey({
          columnNames: ["bought_product_id"],
          referencedColumnNames: ["product_id"],
          referencedTableName: "products",
          onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bought');
  }
}
