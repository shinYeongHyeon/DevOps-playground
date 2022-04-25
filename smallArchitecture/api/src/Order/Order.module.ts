import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './entities/Order.entity';
import { OrderFoodEntity } from './entities/OrderFood.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            OrderFoodEntity,
        ])
    ],
    exports: [],
    providers: []
})
export class OrderModule {}