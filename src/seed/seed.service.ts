import { Injectable } from '@nestjs/common';
import { DeliveryService } from 'src/delivery/delivery.service';
import { OrderService } from 'src/order/order.service';
import { ProductsService } from 'src/products/products.service';
import { Deliveries } from 'src/seed/data/deliveries';
import { ProductTypes } from 'src/seed/data/productTypes';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly deliveryService: DeliveryService,
    private readonly orderService: OrderService,
  ) {}

  async runSeed() {
    await this.insertProducts();
    await this.insertDeliveries();
    await this.deleteOrders();
  }

  async insertProducts() {
    await this.productsService.deleteAll();

    const productTypes = Object.values(ProductTypes);

    for (const type of productTypes) {
      await this.productsService.create({ type });
    }
  }

  async insertDeliveries() {
    await this.deliveryService.deleteAll();

    const deliveries = Object.values(Deliveries);

    for (const name of deliveries) {
      await this.deliveryService.create({
        name,
      });
    }
  }

  async deleteOrders() {
    await this.orderService.deleteAll();
  }
}
