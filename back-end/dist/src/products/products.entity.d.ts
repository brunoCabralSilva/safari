import Bought from "src/bought/Bought.entity";
import Cart from "src/cart/Cart.entity";
import Category from "src/category/category.entity";
export default class Products {
    product_id: string;
    product_name: string;
    product_value: number;
    product_description: string;
    product_image: string;
    product_category: Category;
    cart_product_id: Cart[];
    bought_product_id: Bought[];
    product_size: string;
    product_weight: number;
}
