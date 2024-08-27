import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import { OrderEntity } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { OrderDetailEntity } from '../orders/entities/orderdetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
