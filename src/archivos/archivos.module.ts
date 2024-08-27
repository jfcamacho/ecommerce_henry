import { Module } from '@nestjs/common';
import { ArchivosService } from './archivos.service';
import { ArchivosController } from './archivos.controller';
import { ArchivosRepository } from './archivos.repository';
import { ProductsRepository } from '../products/products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CategoryEntity } from '../categories/entities/category.entity';
import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product, CategoryEntity])],
  controllers: [ArchivosController],
  providers: [ArchivosService, CloudinaryConfig, ArchivosRepository, ProductsRepository],
})
export class ArchivosModule {}
