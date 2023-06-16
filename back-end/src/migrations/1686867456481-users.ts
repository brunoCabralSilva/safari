import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1686867456481 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
