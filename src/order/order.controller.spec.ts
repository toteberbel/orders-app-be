import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });

  describe('findAll', () => {
    it('it should return an array of orders', async () => {
      const result = [
        {
          id: '1',
          order_items: [],
          customer_name: 'John Doe',
          notes: 'No onions',
          days_to_be_delivered: ['lunes', 'martes'],
        },
      ];

      jest
        .spyOn(orderService, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await orderController.findAll()).toBe(result);
    });
  });
});
