import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery } from 'src/delivery/entities/delivery.entity';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
  imports: [TypeOrmModule.forFeature([Delivery])],
  exports: [DeliveryService],
})
export class DeliveryModule {}
