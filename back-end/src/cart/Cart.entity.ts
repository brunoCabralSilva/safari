import Products from "src/products/products.entity";
import Users from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export default class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @ManyToOne(() => Users)
  cart_user_id: Users;

  @ManyToOne(() => Products)
  cart_product_id: Products;

  @Column()
  cart_product_quantity: string;
}