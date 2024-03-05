import { IsString, MinLength } from 'class-validator';

export class CreateDeliveryDto {
  @IsString()
  @MinLength(3)
  name: string;
}
