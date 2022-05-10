import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '../Order/entities/Order.entity';
import { BossController } from './controller/Boss.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
        ])
    ],
    controllers: [ BossController ],
    exports: [],
    providers: []
})
export class BossModule {}
