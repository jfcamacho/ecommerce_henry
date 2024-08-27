import { IsEmail, IsEmpty, IsNotEmpty, IsNotIn, IsOptional, IsString, IsStrongPassword, IsUUID, Length } from "class-validator"
import { OrderEntity } from "../../orders/entities/order.entity"
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @IsOptional()
    @IsUUID()
    @ApiProperty()
    id?: string;

    /**
     * El email debe tener el formato adecuado para poder ser registrado
     * @example test@email.com
     */
    @IsString()
    @IsEmail()
    email: string


    /**
     * El name debe poseer una cadena de entre 8 y 80 caracteres y no debe estar vacio
     * @example Juan Vasquez
     */
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string

    /**
     * El password debe ser una cadena de caracteres con mínimo una letra minúscula, una mayúscula, un número, un símbolo y suu longitud debe estar entre 8 y 15 caractéres
     * @example $Almin45dt2
     */
    @IsString()
    @IsStrongPassword({
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        
    })
    @Length(8, 15)
    password: string

    /**
     * Debe ser identica al password 1
     * @example $Almin45dt2
     */
    @IsString()
    @IsNotEmpty()
    password2?: string

    /**
     * Contiene la dirección del usuario en formato string entre 8 y 80 caracteres
     * @example Guayaquil, puerto bayarta - Ecuador
     */
    @IsString()
    @Length(3, 80)
    address: string

    /**
     * Contiene el telefono del usuario
     * @example 0999999999
     */
    @IsString()
    @IsNotEmpty()
    phone: string

    /**
     * Define si el suaurio registrado es o no administrador por defecto se indica que no lo es
     * Este valor no es indispensable y no se debe enviar en la solicitud de creación del usuario
     * @example false
     */
    @IsOptional()
    @IsEmpty()
    isAdmin?: boolean

    /**
     * País de donde proviene el usuario registrado
     * @example Chile
     */
    @IsOptional()
    @IsString()
    @Length(5, 20)
    country?: string | undefined

    /**
     * Ciudad de donde proviene el usuaio es opcional
     * @example Valencia
     */
    @IsOptional()
    @IsString()
    @Length(5, 20)
    city?: string | undefined

    /**
     * Array en el cual se considera todas las ordenes asociadas a un determinado usuario
     */
    @IsOptional()
    orders?: OrderEntity[]
}
