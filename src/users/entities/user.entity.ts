import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { OrderEntity } from "../../orders/entities/order.entity"

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string = uuid()

    @Column({
        type: "varchar",
        length: 50,
        unique: true
    })
    email: string

    @Column({
        type: "varchar",
        length: 50
    })
    name: string

    @Column({
        type: "varchar",
        length: 80
    })
    password: string

    @Column({
        type: "varchar",
        length: 80
    })
    address: string

    @Column({
        type: "integer"
    })
    phone: string

    @Column({
        default: false
    })
    isAdmin: boolean

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
    })
    country?: string | undefined

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
    })
    city?: string | undefined

    @OneToMany(() => OrderEntity, (order)  => order.user)
    orders: OrderEntity[]
    
}