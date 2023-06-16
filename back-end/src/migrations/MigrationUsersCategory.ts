import { DataSource } from "typeorm";
import { Users1686867456481 } from "./1686867456481-users";
import { Category1686867465234 } from "./1686867465234-category";

export const MigrationUsersCategory = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'safari_bd',
  entities: ['dist/**/*.entity.js'],
  migrations: [
    Users1686867456481,
    Category1686867465234,
  ],
});