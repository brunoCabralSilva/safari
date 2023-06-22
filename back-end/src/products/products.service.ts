import { Delete, Get, Injectable, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Products from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  @Post()
  async insertProduct() {
  };

  @Post()
  async findProduct() {
  };

  @Get()
  async readProducts() {
    return this.productsRepository.find();
  };

  @Patch()
  async updateProduct() {
  };

  @Delete()
  async removeProduct() {
  };
}
