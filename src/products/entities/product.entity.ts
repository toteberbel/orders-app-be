import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum ProductTypes {
  TIRA = 'tira',
  AYUYA = 'ayuya',
  ESPIGA = 'espiga',
  CASERITO = 'caserito',
  CUADRADA = 'cuadrada',
  SALVADO = 'salvado',
  AYUYITA = 'ayuyita',
  ARABE = 'arabe',
  CHORI = 'chori',
  SURTIDO = 'surtido',
  ROSETA = 'roseta',
  LOMO = 'lomo',
  HAMBURGUESA = 'hamburguesa',
  BIZCOCHO = 'bizcocho',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: ProductTypes;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items: OrderItem[];

  // @ManyToMany(() => Order, (order) => order.products)
  // orders: Order[];
}
