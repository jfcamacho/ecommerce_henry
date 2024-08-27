import { CategoryEntity } from "../../categories/entities/category.entity"
import { OrderDetailEntity } from "../../orders/entities/orderdetails.entity"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid }  from "uuid"

@Entity({
    name: 'product'
})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column({
        type: "varchar",
        length: 50
    })
    name: string

    @Column({
        type: "text"
    })
    description: string

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price: number

    @Column({
        type: "integer"
    })
    stock: number

    @Column({
        type: "text",
        default: "https://png.pngtree.com/png-vector/20190413/ourmid/pngtree-img-file-document-icon-png-image_939156.jpg"
    })
    imgUrl?: string

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category?: CategoryEntity

    @ManyToMany(() => OrderDetailEntity, (order) => order.products)
    orderDetails?: OrderDetailEntity[]
}
