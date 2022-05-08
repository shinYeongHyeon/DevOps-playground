import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from '../Shop/entities/Shop.entity';

import { OrderController } from './controller/Order.controller';
import { OrderEntity } from './entities/Order.entity';
import { OrderFoodEntity } from './entities/OrderFood.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            OrderFoodEntity,
            ShopEntity,
        ])
    ],
    controllers: [OrderController],
    exports: [],
    providers: []
})
export class OrderModule {}