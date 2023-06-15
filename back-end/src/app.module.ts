import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: 'localhost',
        port: 3307,
        username: 'root',
        password: 'root',
        database: 'safari_bd',
        entities: ['dist/**/*.entity.js'],
        migrations: ['migrations/*.ts'],
      }
    )],
  controllers: [],
  providers: [],
})
export class AppModule {}
