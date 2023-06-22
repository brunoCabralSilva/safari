import Products from './products.entity';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Products>);
    insertProduct(): Promise<void>;
    findProduct(): Promise<void>;
    readProducts(): Promise<Products[]>;
    updateProduct(): Promise<void>;
    removeProduct(): Promise<void>;
}
