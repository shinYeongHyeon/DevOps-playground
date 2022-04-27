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
    async findAll(@Param('id') id: string): Promise<ShopEntity[]> {
        return await this.shopRepository.find();
    }
}