import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { Product } from "../../products/entities/product.entity";
import { OrderEntity } from "./order.entity";

@Entity({
    name: 'orderdetail'
})
export class OrderDetailEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price: number

    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable()
    products: Product[]

    @OneToOne(() => OrderEntity, (order) => order.orderDetail, { cascade: true })
    @JoinColumn()
    order: OrderEntity
}