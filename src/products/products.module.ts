import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
// import { CategoriesRepository } from 'src/categories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
