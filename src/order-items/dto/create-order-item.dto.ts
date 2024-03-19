import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { MeasureUnit } from 'src/order-items/entities/order-item.entity';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: "The order's unique identifier.",
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: "The product's unique identifier.",
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @ApiProperty({
    example: 3,
    description: 'The quantity of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    enum: MeasureUnit,
    description: 'The measure unit of the product',
  })
  @IsNotEmpty()
  @IsEnum(MeasureUnit)
  measure_unit: MeasureUnit;

  @ApiProperty({
    example: 3,
    description: 'The price of the product',
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
