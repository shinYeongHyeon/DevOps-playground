import {
    Column,
    Entity, ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { ShopEntity } from '../../Shop/entities/Shop.entity';
import { OrderFoodEntity } from './OrderFood.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ShopEntity, shop => shop.orders)
    shop: ShopEntity;

    @Column({
        type: 'varchar',
        length: 40
    })
    address: string;

    @Column({
        type: 'timestamp',
    })
    order_date: Date;

    @Column({
        type: 'int',
        default: -1,
    })
    estimated_time: number;

    @Column({
        type: 'boolean',
        default: false,
    })
    deliver_finish: boolean;

    @OneToMany(type => OrderFoodEntity, orderFood => orderFood.order)
    order_foods: OrderFoodEntity;
}