import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { OrderItemsModule } from 'src/order-items/order-items.module';
import { DeliveryModule } from 'src/delivery/delivery.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, Delivery]),
    OrderItemsModule,
    DeliveryModule,
  ],
  exports: [OrderService],
})
export class OrderModule {}
