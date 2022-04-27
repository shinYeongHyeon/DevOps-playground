import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import { ShopController } from './controller/Shop.controller';
import { ShopRepository } from './entities/provider/Shop.repository';
import { ShopEntity } from "./entities/Shop.entity";
import { MenuEntity } from "./entities/Menu.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ShopEntity,
            MenuEntity,
        ]),
    ],
    controllers: [
        ShopController,
    ],
    exports: [],
    providers: [
        ShopRepository
    ]
})
export class ShopModule {}