import {
    Body,
    Controller,
    Param,
    Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../../Order/entities/Order.entity';

@Controller('boss')
export class BossController {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    @Put('/order/:orderId')
    async updateEstimatedTime(
        @Param('orderId')
        orderId: number,
        @Body()
        updateEstimatedTimeRequestBody: UpdateEstimatedTimeRequestBody
    ) {
        const order = await this.orderRepository.findOneBy({
            id: orderId,
        });

        if (!order) {
            return;
        }

        order.estimated_time = updateEstimatedTimeRequestBody.time;

        await this.orderRepository.save(order);
    }
}

interface UpdateEstimatedTimeRequestBody {
    time: number;
}
