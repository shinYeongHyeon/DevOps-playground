import {
    Body,
    Controller, Get,
    Param,
    Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../../Order/entities/Order.entity';
import { ShopEntity } from '../../Shop/entities/Shop.entity';

@Controller('boss')
export class BossController {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    @Get('shops/:shopId/orders')
    async bossOrders(
        @Param('shopId')
        shopId: number,
    ) {
        return await this.orderRepository.find({
            relations: ['shop'],
            where: {
                shop: {
                    id: shopId,
                },
            }
        });
    }

    @Put('shops/:shopId/orders/:orderId')
    async updateEstimatedTime(
        @Param('shopId')
        shopId: number,
        @Param('orderId')
        orderId: number,
        @Body()
        updateEstimatedTimeRequestBody: UpdateEstimatedTimeRequestBody
    ) {
        const order = await this.orderRepository.findOne({
            where: {
                id: orderId,
            },
            relations: ['shop']
        });

        if (!order) {
            return;
        }

        if (order.shop.id !== Number(shopId)) {
            return;
        }

        order.estimated_time = updateEstimatedTimeRequestBody.time;

        await this.orderRepository.save(order);
    }
}

interface UpdateEstimatedTimeRequestBody {
    time: number;
}
