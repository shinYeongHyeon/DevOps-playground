import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuController } from './controller/Menu.controller';
import { ShopController } from './controller/Shop.controller';
import { ShopEntity } from './entities/Shop.entity';
import { MenuEntity } from './entities/Menu.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ShopEntity,
            MenuEntity,
        ]),
    ],
    controllers: [
        MenuController,
        ShopController,
    ],
    exports: [],
    providers: []
})
export class ShopModule {}
