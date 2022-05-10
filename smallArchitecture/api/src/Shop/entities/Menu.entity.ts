import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ShopEntity } from './Shop.entity';

@Entity('menu')
export class MenuEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ShopEntity, shop => shop.menus)
    shop: ShopEntity;

    @Column({
        type: 'varchar',
        length: 20,
    })
    foodName: string;
}
