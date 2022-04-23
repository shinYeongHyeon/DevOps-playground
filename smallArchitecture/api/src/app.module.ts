import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from "./Shop/entities/Shop.entity";
import {ShopModule} from "./Shop/Shop.module";
import {MenuEntity} from "./Shop/entities/Menu.entity";

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
      ],
      synchronize: true
    }),
      ShopModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
