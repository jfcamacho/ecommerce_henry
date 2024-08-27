import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { Auth } from "../auth/entities/auth.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{

    constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>){}

    users: CreateUserDto[] = [
        // {
        //     id: '1',
        //     email: "antonio@email.com",
        //     name: "Antonio",
        //     password: "antonio",
        //     address: "Los olivos",
        //     phone: "123456789",
        //     country: "Panamá",
        //     city: "Panamá",
        // },
        // {
        //     id: 2,
        //     email: "carmen@email.com",
        //     name: "Carmen",
        //     password: "carmen",
        //     address: "Los almendros",
        //     phone: "987654321",
        //     country: "México",
        //     city: "Ciudad de méxico",
        // },
        // {
        //     id: 3,
        //     email: "estela@email.com",
        //     name: "Estela",
        //     password: "estela",
        //     address: "París 19-501",
        //     phone: "111111111",
        //     country: "España",
        //     city: "Madrir",
        // }
    ]

    async createUser(user: CreateUserDto): Promise<UserEntity>{
        const newUser = await this.usersRepository.save(user)
        return newUser
    }

    async sigin(auth: Auth){
        if(auth.email === "" || auth.password === ""){
            return "No es posible ingresar al APP"
        }else{
            let findedUser = await this.users.find((user: UserEntity) => user.email === auth.email && user.password === auth.password)
            if(findedUser){
                delete findedUser.isAdmin
                return findedUser
            }else{
                return "Email o password incorrectos"
            }
        }
    }

    async getUsers(page: number, limit: number): Promise<UserEntity[]>{
        let listUsers: UserEntity[] = []
        const SearchUsers: UserEntity[] = await this.usersRepository.find()
        for(let x = (page-1)*limit; x < limit; x++){
            if(SearchUsers[x]){
                listUsers.push({...SearchUsers[x],password: undefined})
            }else{
                break
            }
        }
        return listUsers
    }

    async getUserById(id: string): Promise<UserEntity>{
        const newUser: UserEntity = await this.usersRepository.findOne({
            relations: {
                orders: true
            },
            where: {id: id}
        })
        delete newUser.isAdmin
        return newUser
    }

    async getUserByEmail(email: string): Promise<UserEntity>{
        const newUser: UserEntity = await this.usersRepository.findOneBy({email: email})
        return newUser
    }

    async updateUser(newUser: CreateUserDto): Promise<string>{
        this.users = this.users.map((user: CreateUserDto) => {
            return user.id === newUser.id 
            ? newUser
            : user
        })
        return this.users.find((user: UserEntity) => user.id === newUser.id).id
    }

    async deleteUser(id: string): Promise<string>{
        this.users = this.users.filter((user: UserEntity) => user.id !== id)
        return id
    }

}