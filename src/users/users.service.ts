import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private usersRepository: UserRepository){}

  async create(createUserDto: CreateUserDto): Promise<UserEntity>{
    return this.usersRepository.createUser(createUserDto);
  }

  async findAll(page: number, limit: number): Promise<UserEntity[]>{
    return await this.usersRepository.getUsers(page, limit);
  }

  async findOne(id: string): Promise<UserEntity>{
    return this.usersRepository.getUserById(id);
  }

  async update(id:string, user: CreateUserDto): Promise<string> {
    return this.usersRepository.updateUser(id, user);
  }

  async remove(id: string): Promise<string> {
    return this.usersRepository.deleteUser(id);
  }
}
