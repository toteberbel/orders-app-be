import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the delivery',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;
}
