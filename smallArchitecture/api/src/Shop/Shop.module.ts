import { Module } from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ShopEntity} from "./entities/Shop.entity";
import {MenuEntity} from "./entities/Menu.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ShopEntity,
            MenuEntity,
        ])
    ],
    exports: [],
    providers: []
})
export class ShopModule {}