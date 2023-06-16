import Bought from "src/bought/Bought.entity";
import Cart from "src/cart/Cart.entity";
export default class Users {
    user_id: string;
    user_cpf: string;
    user_firstName: string;
    user_lastName: string;
    user_DateOfBirth: Date;
    user_email: string;
    user_password: string;
    cart: Cart[];
    bought: Bought[];
}
