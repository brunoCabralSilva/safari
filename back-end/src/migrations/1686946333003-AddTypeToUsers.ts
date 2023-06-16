import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddTypeToUsers1686946333003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: 'user_type',
        type: 'varchar',
        isNullable: true
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
