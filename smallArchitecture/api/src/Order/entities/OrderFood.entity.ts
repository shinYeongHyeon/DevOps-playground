import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { OrderEntity } from './Order.entity';

@Entity('order_food')
export class OrderFoodEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => OrderEntity, order => order.order_foods)
    order: OrderEntity;

    @Column({
        type: 'varchar',
        length: 20,
        default: '',
    })
    food_name: string;
}