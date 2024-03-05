import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum MeasureUnit {
  KILOGRAM = 'kg',
  UNIT = 'unit',
  GRAMS = 'gr',
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.order_items, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_items)
  product: Product;

  @Column('float', { default: 0 })
  quantity: number;

  @Column()
  measure_unit: MeasureUnit;
}
