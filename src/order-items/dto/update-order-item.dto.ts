import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './create-order-item.dto';
import { IsString } from 'class-validator';

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: 'The order item unique identifier.',
    uniqueItems: true,
  })
  @IsString()
  id: string;
}
