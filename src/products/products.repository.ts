import { Injectable } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { CategoryEntity } from "../categories/entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository{

    // constructor(@InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>){}
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(CategoryEntity) private categoryRepository: Repository<CategoryEntity>
    ){}

    products: Product[] = [];
    listProducts = [
        {
            "name": "Iphone 15",
            "description": "The best smartphone in the world",
            "price": 199.99,
            "stock": 12,
            "category": "smartphone"
        },
        {
            "name": "Samsung Galaxy S23",
            "description": "The best smartphone in the world",
            "price": 150.0,
            "stock": 12,
            "category": "smartphone"
        },
        {
            "name": "Motorola Edge 40",
            "description": "The best smartphone in the world",
            "price": 179.89,
            "stock": 12,
            "category": "smartphone"
        },
        {
            "name": "Samsung Odyssey G9",
            "description": "The best monitor in the world",
            "price": 299.99,
            "stock": 12,
            "category": "monitor"
        },
        {
            "name": "LG UltraGear",
            "description": "The best monitor in the world",
            "price": 199.99,
            "stock": 12,
            "category": "monitor"
        },
        {
            "name": "Acer Predator",
            "description": "The best monitor in the world",
            "price": 150.0,
            "stock": 12,
            "category": "monitor"
        },
        {
            "name": "Razer BlackWidow V3",
            "description": "The best keyboard in the world",
            "price": 99.99,
            "stock": 12,
            "category": "keyboard"
        },
        {
            "name": "Corsair K70",
            "description": "The best keyboard in the world",
            "price": 79.99,
            "stock": 12,
            "category": "keyboard"
        },
        {
            "name": "Logitech G Pro",
            "description": "The best keyboard in the world",
            "price": 59.99,
            "stock": 12,
            "category": "keyboard"
        },
        {
            "name": "Razer Viper",
            "description": "The best mouse in the world",
            "price": 49.99,
            "stock": 12,
            "category": "mouse"
        },
        {
            "name": "Logitech G502 Pro",
            "description": "The best mouse in the world",
            "price": 39.99,
            "stock": 12,
            "category": "mouse"
        },
        {
            "name": "SteelSeries Rival 3",
            "description": "The best mouse in the world",
            "price": 29.99,
            "stock": 12,
            "category": "mouse"
        }
        ]

    async seederProduct(){
        let productsAdded = []
        this.listProducts.forEach(async (product) => {
            const category: CategoryEntity = await this.categoryRepository.findOne({where: {name: product.category}})
            // const newProduct: Product = {...product, category: category}
            const result = await this.productRepository.save({...product, category: category})
            productsAdded.push({id: result.id})
        })
        return "The products have been added to the list of products"
    }

    async createProduct(product: CreateProductDto): Promise<string>{
        const category = await this.categoryRepository.findOneBy({id: product.category.id})
        // const id = this.products.length + 1;
        // this.products.push({id, ...product})
        const newProduct = await this.productRepository.save({...product, category: category})
        return newProduct.id
    }

    async getProducts(): Promise<Product[]>{
        return await this.productRepository.find({
            relations: {
                category: true
            }
        })
    }

    async getProductById(id: string): Promise<Product>{
        const findedProduct: Product = await this.productRepository.findOne({where: {id: id}})
        return findedProduct
    }

    async updateProduct(id:string, newProduct: CreateProductDto): Promise<string>{
        const lastProduct: Product = await this.productRepository.findOneBy({id: id})
        const updatedProduct: Product = await this.productRepository.merge(lastProduct, newProduct)
        await this.productRepository.save(updatedProduct)
        return updatedProduct.id
    }

    async deleteProduct(id: string): Promise<string>{
        const lastProduct: Product = await this.productRepository.findOneBy({id: id})
        const result = await this.productRepository.remove(lastProduct)
        return result.id
    }
}