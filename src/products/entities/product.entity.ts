import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { ProductTypes } from 'src/seed/data/productTypes';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: ProductTypes;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items: OrderItem[];
}
