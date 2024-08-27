import { Product } from "src/products/entities/product.entity"
import { OrderDetailEntity } from "../entities/orderdetails.entity"
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsUUID, ValidateNested } from "class-validator"
import { CreateProductDto } from "../../products/dto/create-product.dto"
import { Type } from "class-transformer"

export class CreateOrderDto {

    /**
     * Usuario al cual se encuentra asociada una determinada orden
     * @example 234sd-gyuh42-kkfu493-2m4n56
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string

    /**
     * Fecha en la cual se registra una determinada orden
     * example 10-06-2024
     */
    @IsOptional()
    date: Date

    /**
     * Arreglo de productos que pertenecen a una determinada orden
     * @example [{}]
     */
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => CreateProductDto)
    products: Product[]
}
