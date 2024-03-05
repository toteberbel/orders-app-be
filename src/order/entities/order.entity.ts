import { UUID } from 'crypto';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { CreateOrderItemDto } from 'src/order-items/dto/create-order-item.dto';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Day {
  LUNES = 'lunes',
  MARTES = 'martes',
  MIERCOLES = 'miercoles',
  JUEVES = 'jueves',
  VIERNES = 'viernes',
  SABADO = 'sabado',
  DOMINGO = 'domingo',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  customer_name: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  // set as default all days of the week
  @Column('enum', {
    enum: Day,
    array: true,
    // set as default all days of the week
    default: Object.values(Day),
  })
  days_to_be_delivered: Day[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Delivery, (delivery) => delivery.orders, { eager: true })
  delivery: Delivery;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  order_items: OrderItem[];
}
