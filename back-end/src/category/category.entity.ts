import Products from "src/products/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export default class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column()
  category_name: string;

  @OneToMany(() => Products, products => products.product_category)
  product_category: Products[];
}