
import { PickType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class Auth extends PickType(CreateUserDto, 
    [
        'email', 
        'password',

    ]) {}