import Bought from "src/bought/Bought.entity";
import Cart from "src/cart/Cart.entity";
import Category from "src/category/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export default class Products {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_value: number;

  @Column()
  product_description: string;

  @Column()
  product_image: string;

  @ManyToOne(() => Category)
  product_category: Category;

  @OneToMany(() => Cart, cart => cart.cart_product_id)
  cart_product_id: Cart[];

  @OneToMany(() => Bought, bought => bought.bought_product_id)
  bought_product_id: Bought[];

  @Column()
  product_size: string;

  @Column()
  product_weight: number;
}