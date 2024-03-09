import { OrderItem } from '../../order-items/entities/order-item.entity';
import { ProductTypes } from '../../seed/data/productTypes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: ProductTypes;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items?: OrderItem[];
}
