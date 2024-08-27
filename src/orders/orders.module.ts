import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { OrderDetailEntity } from './entities/orderdetails.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, Product, OrderDetailEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
