import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The delivery has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDeliveryDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The list of all deliveries.',
  })
  findAll() {
    return this.deliveryService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The delivery has been successfully found.',
  })
  @ApiResponse({
    status: 404,
    description: 'The delivery has not been found.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'The delivery has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'The delivery has not been found.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.update(+id, updateDeliveryDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The delivery has been successfully removed.',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(+id);
  }
}
