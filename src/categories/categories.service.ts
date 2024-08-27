import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  
  constructor(private categoriesRepository: CategoriesRepository){}
  
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.addCategory(createCategoryDto)
  }

  createSeeder(){
    return this.categoriesRepository.createSeeder()
  }
}
