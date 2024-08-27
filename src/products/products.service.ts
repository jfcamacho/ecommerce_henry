import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {

  constructor(private productRepository: ProductsRepository){}

  async create(createProductDto: CreateProductDto): Promise<string>{
    return this.productRepository.createProduct(createProductDto);
  }

  async seederProduct(){
    return await this.productRepository.seederProduct()
  }

  async findAll(): Promise<Product[]>{
    return await this.productRepository.getProducts();
  }

  async findOne(id: string): Promise<Product>{
    return this.productRepository.getProductById(id);
  }

  async update(Product: Product): Promise<string> {
    return this.productRepository.updateProduct(Product);
  }

  async remove(id: string): Promise<string> {
    return this.productRepository.deleteProduct(id);
  }
}
