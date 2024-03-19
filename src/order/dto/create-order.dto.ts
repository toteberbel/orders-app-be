import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Day } from 'src/order/entities/order.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: 'The delivery unique identifier.',
    uniqueItems: true,
  })
  @IsString()
  delivery_id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the customer',
  })
  @IsString()
  customer_name: string;

  @ApiProperty({
    example: 'Add extra cheese !',
    description: 'Some extra notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    enum: Day,
    isArray: true,
    description: 'The days the order will be delivered.',
  })
  @IsOptional()
  @IsEnum(Day, { each: true })
  days_to_be_delivered?: Day[];

  @ApiProperty({
    example: '2021-08-02T00:00:00.000Z',
    description: 'When the order was created',
  })
  @IsOptional()
  created_at?: Date;
}
