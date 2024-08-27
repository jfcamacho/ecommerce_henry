import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { Product } from './entities/product.entity';
import { RolGuard } from '../auth/guards/Rol.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('seeder')
  @HttpCode(201)
  seederProduct() {
    return this.productsService.seederProduct();
  }

  @Get()
  @HttpCode(200)
  async findAll(){
    return await this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolGuard)
  update(@Param('id') id: string, @Body() createProductDto: CreateProductDto) {
    return this.productsService.update({id: id, ...createProductDto});
  }

  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
