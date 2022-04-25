import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from './entities/Order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
        ])
    ],
    exports: [],
    providers: []
})
export class OrderModule {}