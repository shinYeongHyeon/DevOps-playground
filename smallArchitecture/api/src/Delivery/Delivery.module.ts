import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeliveryController } from './controller/Delivery.controller';
import { OrderEntity } from '../Order/entities/Order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
        ])
    ],
    controllers: [ DeliveryController ],
    exports: [],
    providers: []
})
export class DeliveryModule {}
