import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BossModule } from './Boss/Boss.module';
import { DeliveryModule } from './Delivery/Delivery.module';
import { OrderModule } from './Order/Order.module';
import { ShopModule } from './Shop/Shop.module';
import { OrderEntity } from './Order/entities/Order.entity';
import { OrderFoodEntity } from './Order/entities/OrderFood.entity';
import { MenuEntity } from './Shop/entities/Menu.entity';
import { ShopEntity } from './Shop/entities/Shop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'small-architecture-postgre.chebidgehwba.us-west-2.rds.amazonaws.com',
      port: 5432,
      username: 'postgres',
      password: 'postgrespwd!',
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
