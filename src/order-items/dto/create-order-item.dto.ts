import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  isEnum,
} from 'class-validator';
import { UUID } from 'crypto';
import { MeasureUnit } from 'src/order-items/entities/order-item.entity';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsString()
  order_id: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsEnum(MeasureUnit)
  measure_unit: MeasureUnit;

  @IsNumber()
  @IsOptional()
  price?: number;
}
