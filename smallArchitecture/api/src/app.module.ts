import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'saprootuser',
      password: 'sappassword',
      database: 'sap',
      entities: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
