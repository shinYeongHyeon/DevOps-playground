import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossModule } from './Boss/Boss.module';
import { DeliveryModule } from './Delivery/Delivery.module';

import { OrderModule } from './Order/Order.module';
import { OrderEntity } from './Order/entities/Order.entity';
import { OrderFoodEntity } from './Order/entities/OrderFood.entity';
import { ShopModule } from './Shop/Shop.module';
import { MenuEntity } from './Shop/entities/Menu.entity';
import { ShopEntity } from './Shop/entities/Shop.entity';

// TODO: DB 정보 삭제 (인프라 집중이기 때문에, 굳이 config 까지는...)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '',
      port: 5432,
      username: '',
      password: '',
      database: 'sap',
      entities: [
          ShopEntity,
          MenuEntity,
          OrderEntity,
          OrderFoodEntity,
      ],
      synchronize: true
    }),
      ShopModule,
      OrderModule,
      BossModule,
      DeliveryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
