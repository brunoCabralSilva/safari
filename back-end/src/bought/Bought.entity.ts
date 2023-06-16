import Products from "src/products/products.entity";
import Users from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bought')
export default class Bought {
  @PrimaryGeneratedColumn('uuid')
  bought_id: string;

  @ManyToOne(() => Users)
  bought_user_id: Users;

  @ManyToOne(() => Products)
  bought_product_id: Products;

  @Column()
  bought_product_quantity: string;
}