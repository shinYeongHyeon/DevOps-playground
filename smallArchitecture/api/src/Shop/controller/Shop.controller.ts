import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';

import { ShopEntity } from '../entities/Shop.entity';

@Controller('shops')
export class ShopController {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>
    ) {}

    @Get('')
    async findAll(): Promise<ShopEntity[]> {
        return await this.shopRepository.find();
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<ShopEntity> {
        return await this.shopRepository.findOneBy({
            id,
        });
    }
}