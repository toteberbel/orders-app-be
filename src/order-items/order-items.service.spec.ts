import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { OrderItemsService } from '../order-items/order-items.service';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

describe('OrderItemsService', () => {
  let service: OrderItemsService;
  let orderItemRepository: Repository<OrderItem>;

  const ORDER_ITEM_REPOSITORY_TOKEN = getRepositoryToken(OrderItem);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemsService,
        {
          provide: ORDER_ITEM_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: ProductsService, // Provide ProductsService
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderItemsService>(OrderItemsService);
    orderItemRepository = module.get<Repository<OrderItem>>(
      ORDER_ITEM_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('orderItem repository is defined', () => {
    expect(orderItemRepository).toBeDefined();
  });
});
