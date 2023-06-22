import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  async insertProduct() {
  };
  
  @Post()
  async findProduct() {
  };

  @Get()
  async readProducts() {
    return this.productService.readProducts();
  };

  @Patch()
  async updateProduct() {
  };

  @Delete()
  async removeProduct() {
  };
}
