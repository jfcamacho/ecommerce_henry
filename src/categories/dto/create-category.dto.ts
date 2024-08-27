import { IsNotEmpty, IsString, Length, length, max, min } from "class-validator";

export class CreateCategoryDto {
    
    /**
     * Nombre que se le dará a una determinada categoria el cual será una cadena entre 4 y 30 caracteres
     * @example tecnología
     */
    @IsString()
    @IsNotEmpty()
    @Length(4,30)
    name: string

}
