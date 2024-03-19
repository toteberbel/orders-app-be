import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum MeasureUnit {
  KILOGRAM = 'kg',
  UNIT = 'unit',
  GRAMS = 'gr',
}

@Entity()
export class OrderItem {
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: 'The unique identifier of the order item.',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => Order,
    description: 'The order to which the item belongs',
  })
  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  order: Order;

  @ApiProperty({
    type: () => Product,
    description: 'The product of the order item',
  })
  @ManyToOne(() => Product, (product) => product.order_items)
  product: Product;

  @ApiProperty({
    example: 3,
    description: 'The quantity of the product',
  })
  @Column('float', { default: 0 })
  quantity: number;

  @ApiProperty({
    enum: MeasureUnit,
    description: 'The measure unit of the product',
  })
  @Column()
  measure_unit: MeasureUnit;
}
