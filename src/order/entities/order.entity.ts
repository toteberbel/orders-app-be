import { ApiProperty } from '@nestjs/swagger';
import { Delivery } from '../../delivery/entities/delivery.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';

import {
  Column,
  Entity,
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
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: 'The unique identifier of the order.',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Jhon Doe',
    description: "Customer's name",
  })
  @Column('text')
  customer_name: string;

  @ApiProperty({
    example: 'Do not forget to add extra cheese!',
    description: 'Some extra notes',
  })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty({
    enum: Day,
    isArray: true,
    description: 'The days the order will be delivered.',
  })
  @Column('enum', {
    enum: Day,
    array: true,
    // set as default all days of the week
    default: Object.values(Day),
  })
  days_to_be_delivered: Day[];

  @ApiProperty({
    description: 'When the order was created',
  })
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({
    description: 'Who is in charge of delivery the order',
    type: () => Delivery,
  })
  @ManyToOne(() => Delivery, (delivery) => delivery.orders, { eager: true })
  delivery: Delivery;

  @ApiProperty({
    description: 'The items of the order',
    type: () => OrderItem,
    isArray: true,
  })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  order_items: OrderItem[];
}
