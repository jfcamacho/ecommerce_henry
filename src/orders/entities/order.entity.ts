import { UserEntity } from "../../users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid"
import { OrderDetailEntity } from "./orderdetails.entity";

@Entity({
    name: 'order'
})
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity

    @Column()
    date: Date

    @OneToOne(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
    orderDetail: OrderDetailEntity
}
