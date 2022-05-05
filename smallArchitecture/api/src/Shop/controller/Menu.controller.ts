import { Repository } from 'typeorm';
import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { MenuEntity } from '../entities/Menu.entity';

@Controller('menus')
export class MenuController {
    constructor(
        @InjectRepository(MenuEntity)
        private readonly menuRepository: Repository<MenuEntity>
    ) {}

    @Get('')
    async findAll(): Promise<MenuEntity[]> {
        return await this.menuRepository.find({
            relations: ['shop']
        });
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<MenuEntity> {
        return await this.menuRepository.findOne({
            relations: ['shop'],
            where: {
                id,
            }
        });
    }
}
