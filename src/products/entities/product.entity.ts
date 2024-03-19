import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { ProductTypes } from '../../seed/data/productTypes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: 'The unique identifier of the product.',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'White Bread',
    description: 'The name of the product',
    enum: ProductTypes,
  })
  @Column()
  type: ProductTypes;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items?: OrderItem[];
}
