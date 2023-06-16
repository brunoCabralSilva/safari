import { DataSource } from "typeorm";
import { Bought1686887804211 } from "./1686887804211-Bought";
import { Cart1686887810364 } from "./1686887810364-Cart";

export const MigrationUsersCategory = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'safari_bd',
  entities: ['dist/**/*.entity.js'],
  migrations: [
    Bought1686887804211,
    Cart1686887810364,
  ],
});