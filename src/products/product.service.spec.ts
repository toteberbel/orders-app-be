import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductTypes } from '../seed/data/productTypes';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  const PRODUCT_REPOSITORY_TOKEN = getRepositoryToken(Product);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PRODUCT_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      PRODUCT_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('productRepository is defined', () => {
    expect(productRepository).toBeDefined();
  });

  describe('create product', () => {
    it('it should call productRepository.create with correct params', async () => {
      jest.spyOn(productRepository, 'create').mockReturnValueOnce({
        id: '1',
        type: ProductTypes.BAGUETTE,
      });

      await service.create({
        type: ProductTypes.BAGUETTE,
      });

      expect(productRepository.save).toHaveBeenCalledWith({
        id: '1',
        type: ProductTypes.BAGUETTE,
      });
    });
  });
});
