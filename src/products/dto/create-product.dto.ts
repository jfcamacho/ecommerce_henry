import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"
import { CategoryEntity } from "../../categories/entities/category.entity"
import { OrderDetailEntity } from "../../orders/entities/orderdetails.entity"

export class CreateProductDto {
    
    /**
     * Identificador del producto no se requiere para la creación de un producto
     */
    @IsOptional()
    @IsString()
    @IsUUID()
    id?:string

    /**
     * Nombre del producto
     * @example monitor
     */
    @IsString()
    name: string

    /**
     * Descripción del producto a ser registrado
     * @example monitor de 27" marca sansung FHD
     */
    @IsString()
    description: string

    /**
     * El precio final del producto incluido impuestos
     * @example 308.45
     */
    @IsNumber()
    price: number

    /**
     * Este apartado describe la catidad de productos disponibles en el local
     * @example 12
     */
    @IsNumber()
    stock: number

    /**
     * Imagen asociada al producto la cual será almancenada en un servicio externo
     * @example https://storage.extern.com/imagen_test.png
     */
    @IsString()
    @IsOptional()
    imgUrl?: string

    /**
     * A que categoria pertenece el producto asociado
     * @example tecnología
     */
    @IsOptional()
    category?: CategoryEntity;

    /**
     * Los detalles de orden asociados a este dispositivo
     * @example []
     */
    @IsOptional()
    orderDetails?: OrderDetailEntity[]
}
