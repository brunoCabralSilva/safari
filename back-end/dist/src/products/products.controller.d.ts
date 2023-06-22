import { ProductsService } from './products.service';
export declare class ProductsController {
    private productService;
    constructor(productService: ProductsService);
    insertProduct(): Promise<void>;
    findProduct(): Promise<void>;
    readProducts(): Promise<import("./products.entity").default[]>;
    updateProduct(): Promise<void>;
    removeProduct(): Promise<void>;
}
