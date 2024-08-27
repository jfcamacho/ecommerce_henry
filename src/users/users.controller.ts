import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put, UseInterceptors, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { RolGuard } from '../auth/guards/Rol.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // @HttpCode(201)
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.create(createUserDto);
  // }

  /**
   * Este método retorna todos los usuarios almacenados en la base de datos en una rango definido por page y limit
   * @param page 
   * @param limit 
   * @returns 
   */

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolGuard)
  @HttpCode(200)
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    page === undefined ? page = '1' : page
    limit === undefined ? limit = '5' : limit
    return await this.usersService.findAll(Number(page), Number(limit));
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() user: CreateUserDto) {
    return await this.usersService.update({id: id, ...user});
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
