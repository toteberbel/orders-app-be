import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderItemDto } from 'src/order-items/dto/update-order-item.dto';
import { Order } from 'src/order/entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The orders has been successfully retrieved.',
    type: [Order],
  })
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The order has been successfully retrieved.',
    type: Order,
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The order has been successfully updated.',
    type: Order,
  })
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The order items has been successfully updated.',
    type: Order,
  })
  @Put(':id/items')
  updateOrderItems(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() UpdateOrderItemDTO: UpdateOrderItemDto[],
  ) {
    return this.orderService.updateOrderItems(id, UpdateOrderItemDTO);
  }

  @ApiResponse({
    status: 200,
    description: 'The order has been successfully removed.',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}
