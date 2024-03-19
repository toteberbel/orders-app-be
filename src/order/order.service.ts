import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { UpdateOrderItemDto } from 'src/order-items/dto/update-order-item.dto';
import { OrderItemsService } from 'src/order-items/order-items.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly orderItemService: OrderItemsService,
    private readonly deliveryService: DeliveryService,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User) {
    // check if the delivery exsits
    const delivery = await this.deliveryService.findOne(
      createOrderDto.delivery_id,
    );

    const order = this.orderRepository.create({
      ...createOrderDto,
      user,
    });

    order.delivery = delivery;

    await this.orderRepository.save(order);
    return order;
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['order_items', 'order_items.product'],
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['order_items', 'order_items.product'],
    });
    if (!order) throw new BadRequestException('Order not found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto, user: User) {
    const order = await this.findOne(id);

    if (updateOrderDto.delivery_id) {
      // check if the delivery exsits
      const delivery = await this.deliveryService.findOne(
        updateOrderDto.delivery_id,
      );
      order.delivery = delivery;
    }

    this.orderRepository.merge(order, updateOrderDto);
    order.user = user;
    const updatedOrder = await this.orderRepository.save(order);

    return updatedOrder;
  }

  async updateOrderItems(
    orderId: string,
    orderItems: UpdateOrderItemDto[],
  ): Promise<Order> {
    // Retrieve the order from the database
    const order = await this.findOne(orderId);

    // Loop through the updateOrderItemsDTO
    for (const updateItem of orderItems) {
      // Check if the item already exists in the database
      const existingItem = order.order_items.find(
        (item) => item.id === updateItem.id,
      );

      if (existingItem) {
        // Update existing item
        const updatedItem = await this.orderItemService.update(
          updateItem.id,
          updateItem,
        );
        // Replace the existing item with the updated item
        const index = order.order_items.indexOf(existingItem);
        order.order_items[index] = updatedItem;
      } else {
        // Create new item
        const newItem = await this.orderItemService.create(
          {
            order_id: orderId,
            product_id: updateItem.product_id,
            quantity: updateItem.quantity,
            measure_unit: updateItem.measure_unit,
          },
          order,
        );

        // Add the new item to the order
        order.order_items.push(newItem);
      }
    }

    // Save the updated order
    return order;
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    await this.orderRepository.remove(order);
  }

  async deleteAll() {
    try {
      await this.orderRepository.delete({});
    } catch (error) {
      throw new InternalServerErrorException('Error deleting orders');
    }
  }
}
