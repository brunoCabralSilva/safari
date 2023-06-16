import Products from "src/products/products.entity";
import Users from "src/users/users.entity";
export default class Cart {
    cart_id: string;
    cart_user_id: Users;
    cart_product_id: Products;
    cart_product_quantity: string;
}
