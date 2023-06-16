import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';
import { BoughtController } from './bought/bought.controller';
import { BoughtModule } from './bought/bought.module';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    CartModule,
    BoughtModule,
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
    ),
    UsersModule,
    CategoryModule,
    BoughtModule,
    CartModule,
  ],
  controllers: [BoughtController],
  providers: [CartService],
})
export class AppModule {}
