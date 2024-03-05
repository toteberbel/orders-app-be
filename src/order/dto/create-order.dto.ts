import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Day } from 'src/order/entities/order.entity';

export class CreateOrderDto {
  @IsString()
  delivery_id: string;

  @IsString()
  customer_name: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(Day, { each: true })
  days_to_be_delivered?: Day[];

  @IsOptional()
  created_at?: Date;
}
