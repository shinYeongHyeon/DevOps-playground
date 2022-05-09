import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { _ } from 'lodash';

import { OrderEntity } from '../entities/Order.entity';
import { OrderFoodEntity } from '../entities/OrderFood.entity';
import { MenuEntity } from '../../Shop/entities/Menu.entity';
import { ShopEntity } from '../../Shop/entities/Shop.entity';

@Controller('orders')
export class OrderController {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        @InjectRepository(OrderFoodEntity)
        private readonly orderFoodRepository: Repository<OrderFoodEntity>,
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>,
    ) {}

    @Get()
    async orderInventory(): Promise<OrderEntity[]> {
        return await this.orderRepository.find();
    }

    @Get(':orderId')
    async getOrder(
        @Param(':orderId')
        orderId: number,
    ): Promise<OrderEntity> {
        return await this.orderRepository.findOneBy({
            id: orderId,
        });
    }

    @Post()
    async order(
        @Body()
        orderRequestDto: OrderRequestDto,
        ): Promise<void> {
        const foods = await Promise
            .all(
                _.map(orderRequestDto.foodIds, (foodId) => {
                    return this.menuRepository.findOneBy({
                        id: foodId,
                    });
                }));

        const order = await this.orderRepository.save({
            shop: await this.shopRepository.findOneBy({
                id: orderRequestDto.shopId,
            }),
            address: orderRequestDto.address,
            order_date: new Date(),
        });

        await Promise.all(
            _.map(
                foods,
                (food) => this.orderFoodRepository.save({
                    order,
                    food_name: food.foodName
                })
            )
        );

        return;
    }
}

interface OrderRequestDto {
    address: string;
    shopId: number;
    foodIds: number[];
}
