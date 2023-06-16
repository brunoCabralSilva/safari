import Bought from "src/bought/Bought.entity";
import Cart from "src/cart/Cart.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  user_cpf: string;

  @Column()
  user_firstName: string;

  @Column()
  user_lastName: string;

  @Column()
  user_DateOfBirth: Date;

  @Column()
  user_email: string;

  @Column()
  user_password: string;

  @OneToMany(() => Cart, cart => cart.cart_user_id)
  cart: Cart[];

  @OneToMany(() => Bought, bought => bought.bought_user_id)
  bought: Bought[];
}