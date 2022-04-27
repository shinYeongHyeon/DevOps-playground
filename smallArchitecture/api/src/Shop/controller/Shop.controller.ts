import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    Controller,
    Get,
    Inject,
    Param,
} from '@nestjs/common';
import { ShopRepository } from '../entities/provider/Shop.repository';

import { ShopEntity } from '../entities/Shop.entity';

@Controller('shops')
export class ShopController {
    constructor(
        @InjectRepository(ShopRepository) private shopRepository: ShopRepository
    ) {}

    @Get('')
    async findAll(@Param('id') id: string): Promise<ShopEntity[]> {
        return await this.shopRepository.find();
    }
}