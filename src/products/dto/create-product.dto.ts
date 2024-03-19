import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProductTypes } from 'src/seed/data/productTypes';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    nullable: false,
    minLength: 1,
    examples: Object.values(ProductTypes),
  })
  @IsEnum(ProductTypes)
  type: ProductTypes;
}
