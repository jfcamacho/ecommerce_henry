import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesRepository{

    constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>){}

    listCategories = [
        {name: 'smartphone'},
        {name: 'monitor'},
        {name: 'keyboard' },
        {name: 'mouse'}
    ]
    async createSeeder(){
        this.listCategories.forEach(async (category) => {
            const catego =  await this.categoryRepository.save(category)
        })
        return "Correct..."
    }

    async getCategories(){
        return await this.categoryRepository.find()
    }

    async addCategory(category: CreateCategoryDto){
        const newCategory = await this.categoryRepository.save(category)
        return newCategory
    }
}