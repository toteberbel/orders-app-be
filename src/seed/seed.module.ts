import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from 'src/products/products.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { OrderModule } from 'src/order/order.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [SeedService],
  controllers: [SeedController],
  imports: [ProductsModule, DeliveryModule, OrderModule, AuthModule],
})
export class SeedModule {}
