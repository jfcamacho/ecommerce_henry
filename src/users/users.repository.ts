import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Auth } from "../auth/entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import  * as bcrypt from "bcrypt"

@Injectable()
export class UserRepository{

    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>){}

    async createUser(user: CreateUserDto): Promise<UserEntity>{
        const newUser = await this.usersRepository.save(user)
        return newUser
    }

    // async sigin(auth: Auth){
    //     if(auth.email === "" || auth.password === ""){
    //         return "No es posible ingresar al APP"
    //     }else{
    //         let findedUser = await this.users.find((user: UserEntity) => user.email === auth.email && user.password === auth.password)
    //         if(findedUser){
    //             delete findedUser.isAdmin
    //             return findedUser
    //         }else{
    //             return "Email o password incorrectos"
    //         }
    //     }
    // }

    async getUsers(page: number, limit: number): Promise<UserEntity[]>{
        const offset = (page - 1) * limit;
        const SearchUsers: UserEntity[] = await this.usersRepository.find({
            skip: offset,
            take: limit,
          })
        return SearchUsers
    }

    async getUserById(id: string): Promise<UserEntity>{
        try {
            const newUser: UserEntity = await this.usersRepository.findOne({
                relations: {
                    orders: true
                },
                where: {id: id}
            })
            delete newUser.isAdmin
            return newUser
        } catch (error) {
            throw new BadRequestException('Error en el id solicitado')
        }
    }

    async getUserByEmail(email: string): Promise<UserEntity>{
        const newUser: UserEntity = await this.usersRepository.findOneBy({email: email})
        return newUser
    }

    async updateUser(id:string, newUser: CreateUserDto): Promise<string>{
        try {
            if(newUser.password !== newUser.password2){
                throw new ForbiddenException('Las contraseñas no coinciden')
            }
            let oldUser = await this.usersRepository.findOneBy({id: id})
            const salt = await bcrypt.genSalt(5)
            newUser.password = await bcrypt.hash(newUser.password, salt)
            let updatedUser = this.usersRepository.merge(oldUser, newUser)
            await this.usersRepository.save(updatedUser)
            return updatedUser.id
        } catch (error) {
            throw new BadRequestException('Error al tratar de actualizar el registro', error)
        }
    }

    async deleteUser(id: string): Promise<string>{
        try {
            let findedUser = await this.usersRepository.findOneBy({id: id})
            let result = await this.usersRepository.remove(findedUser)
            return result.id
        } catch (error) {
            throw new BadRequestException('El registro no existe o no es posible eliminarlo')
        }
    }

}