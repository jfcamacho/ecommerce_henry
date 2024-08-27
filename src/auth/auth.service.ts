import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import { AuthRepository } from './auth.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(private authRepository: AuthRepository){}

  async signin(auth: CreateAuthDto){
    return await this.authRepository.signin(auth);
  }

  async signup(auth: CreateUserDto){
    if(auth.password !== auth.password2){
      throw new BadRequestException('Las contraseñas no coinciden')
    }else{
      delete auth.password2
      return await this.authRepository.signup(auth);
    }
  }
}
