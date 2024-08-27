import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository){}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }
  async addOrder(createOrderDto: CreateOrderDto){
    return await this.ordersRepository.addOrder(createOrderDto)
  }

  findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: string) {
    return await this.ordersRepository.getOrder(id)
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
