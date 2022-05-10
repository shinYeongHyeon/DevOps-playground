import { Controller, Get, Param, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderEntity } from '../../Order/entities/Order.entity';

@Controller('delivery')
export class DeliveryController {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {}

    @Get('not-delivered-orders')
    async getNotDeliveredOrders() {
        return await this.orderRepository.findBy({
            deliver_finish: false,
        });
    }

    @Put('orders/:orderId/delivery-finish')
    async deliveryFinish(
        @Param('orderId')
        orderId: number,
    ) {
        const order = await this.orderRepository.findOneBy({
            id: orderId,
        });

        if (!order) {
            return;
        }

        order.deliver_finish = true;

        await this.orderRepository.save(order);

        return;
    }
}