import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import Cart from './Cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Users from 'src/users/users.entity';
import Products from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Users, Products])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
