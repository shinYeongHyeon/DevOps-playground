import { Controller, Get, Param } from '@nestjs/common';

@Controller('shops')
export class ShopController {
    @Get(':id')
    find(@Param('id') id: string): string {
        return `requested id : ${id}`;
    }
}