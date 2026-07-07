import { ConflictError, NotFoundError } from '@/shared';

import { ProductMapper } from '@/features/product/product.mapper';
import { ProductService } from '@/features/product/product.service';
import type { ProductRepository } from '@/features/product/product.repository';

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn().mockResolvedValue(undefined),
    };

    service = new ProductService(repository);
  });

  describe('create', () => {
    it('should create a product', async () => {
      const payload = {
        name: 'MacBook Pro',
        description: 'Apple Laptop',
        price: 2500,
        stock: 10,
      };

      repository.findByName.mockResolvedValue(null);

      const entity = ProductMapper.toEntity(payload);

      repository.create.mockResolvedValue(entity);

      const result = await service.create(payload);

      expect(repository.findByName).toHaveBeenCalledWith(payload.name);
      expect(repository.create).toHaveBeenCalledTimes(1);

      expect(result.name).toBe(payload.name);
      expect(result.description).toBe(payload.description);
      expect(result.price).toBe(payload.price);
      expect(result.stock).toBe(payload.stock);
    });

    it('should throw conflict when product already exists', async () => {
      const payload = {
        name: 'MacBook Pro',
        description: 'Apple Laptop',
        price: 2500,
        stock: 10,
      };

      repository.findByName.mockResolvedValue(ProductMapper.toEntity(payload));

      await expect(service.create(payload)).rejects.toThrow(ConflictError);

      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [
        ProductMapper.toEntity({
          name: 'MacBook',
          description: 'Laptop',
          price: 100,
          stock: 5,
        }),
      ];

      repository.findAll.mockResolvedValue(products);

      const result = await service.findAll();

      expect(repository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('MacBook');
    });
  });

  describe('findById', () => {
    it('should return product by id', async () => {
      const entity = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 5,
      });

      repository.findById.mockResolvedValue(entity);

      const result = await service.findById(entity.id);

      expect(repository.findById).toHaveBeenCalledWith(entity.id);
      expect(result.id).toBe(entity.id);
    });

    it('should throw when product does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findById('1')).rejects.toThrow(NotFoundError);
    });
  });

  describe('update', () => {
    it('should update product', async () => {
      const entity = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 5,
      });

      repository.findById.mockResolvedValue(entity);
      repository.findByName.mockResolvedValue(null);
      repository.update.mockResolvedValue(entity);

      const result = await service.update(entity.id, {
        price: 200,
      });

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(result.price).toBe(200);
    });

    it('should throw when updating unknown product', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.update('1', {
          price: 100,
        }),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should delete product', async () => {
      const entity = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 5,
      });

      repository.findById.mockResolvedValue(entity);

      await service.delete(entity.id);

      expect(repository.delete).toHaveBeenCalledWith(entity.id);
    });

    it('should throw when deleting unknown product', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.delete('1')).rejects.toThrow(NotFoundError);

      expect(repository.delete).not.toHaveBeenCalled();
    });
  });
});
