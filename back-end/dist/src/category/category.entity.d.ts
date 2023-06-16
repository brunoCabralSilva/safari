import Products from "src/products/products.entity";
export default class Category {
    category_id: string;
    category_name: string;
    product_category: Products[];
}
