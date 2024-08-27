import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Auth } from "./entities/auth.entity";
import  * as bcrypt from "bcrypt"
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthRepository {
    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>, private readonly jwtService: JwtService){}

    async signin(auth: Auth){
        let findedUser = await this.usersRepository.findOne({where: {email: auth.email}})
        if(findedUser){
            const isValid = await bcrypt.compare(auth.password, findedUser.password)
            delete findedUser.password
            if(!isValid) {
                throw new BadRequestException("Email o password incorrectos")
            }
            const payload = {
                id: findedUser.id,
                email: findedUser.email,
                name: findedUser.name
            }
            const jwt = this.jwtService.sign(payload)
            return {success: 'User Login', token: jwt}
        }else{
            throw new BadRequestException("Email o password incorrectos")
        }
    }

    async signup(auth: CreateUserDto){
        const salt = await bcrypt.genSalt(5)
        auth.password = await bcrypt.hash(auth.password, salt)
        const newUser = await this.usersRepository.save(auth)
        delete newUser.password
        return newUser
    }
}