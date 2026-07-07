import { BadRequestError } from '@/shared';

import { ProductEntity } from '@/features/product/product.entity';

describe('ProductEntity', () => {
  let product: ProductEntity;

  beforeEach(() => {
    product = new ProductEntity(
      '1',
      'MacBook Pro',
      'Apple Laptop',
      2500,
      10,
      true,
    );
  });

  describe('constructor', () => {
    it('should create a valid product', () => {
      expect(product.id).toBe('1');
      expect(product.name).toBe('MacBook Pro');
      expect(product.description).toBe('Apple Laptop');
      expect(product.price).toBe(2500);
      expect(product.stock).toBe(10);
      expect(product.active).toBe(true);
    });

    it('should throw when price is less than or equal to zero', () => {
      expect(() => {
        new ProductEntity('1', 'MacBook', 'Laptop', 0, 10, true);
      }).toThrow(BadRequestError);
    });

    it('should throw when stock is negative', () => {
      expect(() => {
        new ProductEntity('1', 'MacBook', 'Laptop', 2500, -1, true);
      }).toThrow(BadRequestError);
    });

    it('should throw when name is empty', () => {
      expect(() => {
        new ProductEntity('1', '', 'Laptop', 2500, 10, true);
      }).toThrow(BadRequestError);
    });
  });

  describe('updateName', () => {
    it('should update product name', () => {
      product.updateName('MacBook Air');

      expect(product.name).toBe('MacBook Air');
    });
  });

  describe('updateDescription', () => {
    it('should update product description', () => {
      product.updateDescription('Updated Description');

      expect(product.description).toBe('Updated Description');
    });
  });

  describe('updatePrice', () => {
    it('should update price', () => {
      product.updatePrice(3000);

      expect(product.price).toBe(3000);
    });

    it('should throw when price is invalid', () => {
      expect(() => {
        product.updatePrice(0);
      }).toThrow(BadRequestError);
    });
  });

  describe('updateStock', () => {
    it('should update stock', () => {
      product.updateStock(25);

      expect(product.stock).toBe(25);
    });

    it('should throw when stock is negative', () => {
      expect(() => {
        product.updateStock(-5);
      }).toThrow(BadRequestError);
    });
  });

  describe('activate', () => {
    it('should activate product', () => {
      product.deactivate();

      product.activate();

      expect(product.active).toBe(true);
    });
  });

  describe('deactivate', () => {
    it('should deactivate product', () => {
      product.deactivate();

      expect(product.active).toBe(false);
    });
  });
});
