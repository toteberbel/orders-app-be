import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { Order } from 'src/order/entities/order.entity';
import { validate } from 'class-validator';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly productService: ProductsService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto, order: Order) {
    // since we are not creating order items from the controller (it's not a direct HTTP request but a side effect of creating an order), we need to validate the order item dto

    const dtoInstance = Object.assign(
      new CreateOrderItemDto(),
      createOrderItemDto,
    );

    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      throw new BadRequestException(errors.map((e) => e.constraints));
    }

    const product = await this.productService.findOne(
      createOrderItemDto.product_id,
    );

    const payload = {
      quantity: createOrderItemDto.quantity,
      measure_unit: createOrderItemDto.measure_unit,
      product,
      order,
    };
    const orderItem = this.orderItemRepository.create(payload);

    return this.orderItemRepository.save(orderItem);
  }

  findAll() {
    return `This action returns all orderItems`;
  }

  async findOne(id: string) {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
    });
    console.log(orderItem);
    if (!orderItem) throw new BadRequestException('order Item not found');
    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItemToUpdate = await this.findOne(id);

    const dtoInstance = Object.assign(
      new UpdateOrderItemDto(),
      updateOrderItemDto,
    );

    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      throw new BadRequestException(errors.map((e) => e.constraints));
    }

    const product = await this.productService.findOne(
      updateOrderItemDto.product_id,
    );

    if (!product) throw new BadRequestException('Product not found');

    orderItemToUpdate.product = product;

    this.orderItemRepository.merge(orderItemToUpdate, updateOrderItemDto);
    return this.orderItemRepository.save(orderItemToUpdate);
  }

  async remove(id: string) {
    const orderItem = await this.findOne(id);
    return await this.orderItemRepository.remove(orderItem);
  }
}
