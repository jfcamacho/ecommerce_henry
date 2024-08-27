import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UserEntity } from "../users/entities/user.entity";
import { Product } from "../products/entities/product.entity";
import { OrderDetailEntity } from "./entities/orderdetails.entity";

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(OrderDetailEntity) private orderdetailRepository: Repository<OrderDetailEntity>
    ){}

    async addOrder(createdOrder: CreateOrderDto){
        let orderDetail: OrderDetailEntity = new OrderDetailEntity()
        const user = await this.userRepository.findOne({where: {id: createdOrder.userId}})
        const order = await this.orderRepository.save({...createdOrder, user: user, date: new Date()});
        let products = await this.productRepository.findBy(createdOrder.products)
        orderDetail.products = products
        orderDetail.price = products.reduce(((total, product) => total += Number(product.price)), 0)
        orderDetail.order = order
        const detail: OrderDetailEntity = await this.orderdetailRepository.save(orderDetail)
        createdOrder.products.forEach(async (product) => {
            let newProduct: Product = await this.productRepository.findOne({where: {id: product.id}})
            if(newProduct.stock > 0){
                newProduct.stock -= 1
                const actProduct = await this.productRepository.update(newProduct.id, {stock: newProduct.stock})
            }
        })

        return {price: detail.price, id: detail.id}
    }

    async getOrder(id: string){

        const order = await this.orderRepository.find({
            relations: {
                orderDetail: {
                    products: true
                }
            },
            where: {id: id}
        })

        return order

    }
}