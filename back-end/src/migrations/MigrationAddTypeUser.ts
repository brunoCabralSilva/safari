import { DataSource } from "typeorm";
import { AddTypeToUsers1686946333003 } from "./1686946333003-AddTypeToUsers";

export const MigrationProducts = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'safari_bd',
  entities: ['dist/**/*.entity.js'],
  migrations: [
    AddTypeToUsers1686946333003,
  ],
});