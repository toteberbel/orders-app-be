import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Order } from '../../order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delivery {
  @ApiProperty({
    example: 'ca3214ds-sdcc3214-asc123-wsawq',
    description: 'The delivery unique identifier.',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the delivery person',
  })
  @Column()
  @IsString()
  name: string;

  @OneToMany(() => Order, (order) => order.delivery)
  orders?: Order[];
}
