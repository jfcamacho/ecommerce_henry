import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { CreateUserDto } from "../../users/dto/create-user.dto";
import { PickType } from "@nestjs/swagger";

export class CreateAuthDto extends PickType(CreateUserDto, 
    [
        'email', 
        'password',

    ]){}