import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopEntity } from '../../Shop/entities/Shop.entity';
import { OrderEntity } from '../entities/Order.entity';

@Controller('orders')
export class OrderController {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
    ) {}

    @Post()
    async order(
        @Body()
        orderRequestDto: OrderRequestDto,
        ): Promise<void> {

        await this.orderRepository.save({
            shop: await this.shopRepository.findOneBy({
                id: orderRequestDto.shopId,
            }),
            address: orderRequestDto.address,
            order_date: new Date(),
        });

        // Implements order-foods

        return;
    }
}

interface OrderRequestDto {
    address: string;
    shopId: number;
}
