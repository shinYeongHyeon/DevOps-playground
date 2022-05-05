import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    Body,
    Controller,
    Get,
    Param, Post,
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

    @Post()
    async save(@Body() saveShopDto: SaveShopDto): Promise<void> {
        await this.shopRepository.save({
            ...saveShopDto
        })
    }
}

interface SaveShopDto {
    name: string;
    address: string;
}