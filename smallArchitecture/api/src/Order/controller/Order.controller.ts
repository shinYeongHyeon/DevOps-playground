import { Controller } from '@nestjs/common';

@Controller('orders')
export class OrderController {
    constructor() {}

    async order(): Promise<void> {
        return;
    }
}

interface OrderRequestDto {}
