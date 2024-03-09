import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItemsService } from '../order-items/order-items.service';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { Day, Order } from 'src/order/entities/order.entity';
import { DeliveryService } from 'src/delivery/delivery.service';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;

  const ORDER_REPOSITORY_TOKEN = getRepositoryToken(Order);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: ORDER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: DeliveryService, // Provide ProductsService
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: OrderItemsService, // Provide ProductsService
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(ORDER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('orderItem repository is defined', () => {
    expect(orderRepository).toBeDefined();
  });

  describe('create order', () => {
    it('it should call orderRepository.create with correct params', async () => {
      const payload = {
        id: '1',
        delivery: { id: '1', name: 'lolo' },
        customer_name: 'Jane',
        notes: 'some notes',
        created_at: new Date(),
        days_to_be_delivered: [Day.DOMINGO],
        order_items: [],
      };

      jest.spyOn(orderRepository, 'create').mockReturnValueOnce(payload);

      await service.create({
        delivery_id: '1',
        customer_name: 'Jane',
        notes: 'some notes',
        created_at: new Date(),
        days_to_be_delivered: [Day.DOMINGO],
      });

      expect(orderRepository.save).toHaveBeenCalledWith(payload);
    });
  });
});
