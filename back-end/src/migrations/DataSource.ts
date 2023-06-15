import { DataSource } from "typeorm";
import { Products1686865702095 } from "./1686865702095-products";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'safari_bd',
  entities: ['dist/**/*.entity.js'],
  migrations: [Products1686865702095],
});