import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MenuEntity} from "./Menu.entity";

@Entity('shop')
export class ShopEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 20
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 40,
    })
    address: string;

    @OneToMany(type => MenuEntity, menu => menu.shop)
    menus: MenuEntity;
}