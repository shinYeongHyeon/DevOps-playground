import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from './Order/Order.module';
import { OrderEntity } from './Order/entities/Order.entity';
import { OrderFoodEntity } from './Order/entities/OrderFood.entity';
import { ShopModule } from './Shop/Shop.module';
import { MenuEntity } from './Shop/entities/Menu.entity';
import { ShopEntity } from './Shop/entities/Shop.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'saprootuser',
      password: 'sappassword',
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
