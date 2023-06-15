import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  product_category: number;

  @Column()
  product_size: string;

  @Column()
  product_weight: number;
}