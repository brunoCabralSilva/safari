import Products from "src/products/products.entity";
import Users from "src/users/users.entity";
export default class Bought {
    bought_id: string;
    bought_user_id: Users;
    bought_product_id: Products;
    bought_product_quantity: string;
}
