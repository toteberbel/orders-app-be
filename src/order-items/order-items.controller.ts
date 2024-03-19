import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Order } from 'src/order/entities/order.entity';
@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order item has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createOrderItemDto: CreateOrderItemDto, order: Order) {
    return this.orderItemsService.create(createOrderItemDto, order);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all order items.',
  })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully found.',
  })
  @ApiResponse({
    status: 404,
    description: 'The order item has not been found.',
  })
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'The order item has not been found.',
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The order item has been successfully removed.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(id);
  }
}
