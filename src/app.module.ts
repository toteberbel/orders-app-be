import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SeedService } from './seed/seed.service';
import { SeedModule } from './seed/seed.module';
import { OrderItemsModule } from './order-items/order-items.module';

@Module({
  imports: [
    OrderModule,
    DeliveryModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    SeedModule,
    OrderItemsModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
