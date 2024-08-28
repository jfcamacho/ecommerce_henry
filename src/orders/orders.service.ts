import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository){}

  async addOrder(createOrderDto: CreateOrderDto){
    return await this.ordersRepository.addOrder(createOrderDto)
  }

  async findOne(id: string) {
    return await this.ordersRepository.getOrder(id)
  }

}
