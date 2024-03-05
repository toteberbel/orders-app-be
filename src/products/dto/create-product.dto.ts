import { IsEnum } from 'class-validator';
import { ProductTypes } from 'src/products/entities/product.entity';

export class CreateProductDto {
  @IsEnum(ProductTypes)
  type: ProductTypes;
}
