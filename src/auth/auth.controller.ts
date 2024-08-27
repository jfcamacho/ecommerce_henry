import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // *-------------------- Endpoints implementados de forma manual --------------------
  @Post('signin')
  signin(@Body() auth: CreateAuthDto) {
    // try {
      return this.authService.signin(auth)
    // } catch (error) {
    //   return(error)
    // }
  }

  @Post('signup')
  signup(@Body() user: CreateUserDto) {
   return this.authService.signup(user);
  }
  // *-------------------- Endpoints implementados de forma manual --------------------

}
