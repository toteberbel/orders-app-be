import { IsEnum } from 'class-validator';
import { ProductTypes } from 'src/seed/data/productTypes';

export class CreateProductDto {
  @IsEnum(ProductTypes)
  type: ProductTypes;
}
