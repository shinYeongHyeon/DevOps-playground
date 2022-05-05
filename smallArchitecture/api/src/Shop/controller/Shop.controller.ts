import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { MenuEntity } from '../entities/Menu.entity';
import { ShopEntity } from '../entities/Shop.entity';

@Controller('shops')
export class ShopController {
    constructor(
        @InjectRepository(ShopEntity)
        private readonly shopRepository: Repository<ShopEntity>,
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>,
    ) {}

    @Get('')
    async findAll(): Promise<ShopEntity[]> {
        return await this.shopRepository.find({
            relations: ['menus']
        });
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

    @Get(':shopId/menus')
    async findAllMenus(): Promise<MenuEntity[]> {
        return await this.menuRepository.find();
    }

    @Get(':shopId/menus/:menuId')
    async findMenu(
        @Param('shopId')
        shopId: number,
        @Param('menuId')
        menuId: number,
    ): Promise<MenuEntity> {
        return await this.menuRepository.findOneBy({
            id: menuId,
            shop: await this.shopRepository.findOneBy({
                id: shopId,
            })
        })
    }

    @Post(':shopId/menus')
    async saveMenu(
        @Param('shopId')
        shopId: number,
        @Body()
        saveMenuDto: SaveMenuDto,
    ): Promise<void> {
        await this.menuRepository.save({
            foodName: saveMenuDto.foodName,
            shop: await this.shopRepository.findOneBy({
                id: shopId,
            }),
        })
    }
}

interface SaveShopDto {
    name: string;
    address: string;
}

interface SaveMenuDto {
    foodName: string;
}
