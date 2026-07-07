import { BadRequestError, NotFoundError } from '@/shared';

import { CartMapper } from '@/features/cart/cart.mapper';
import { CartService } from '@/features/cart/cart.service';
import type { CartRepository } from '@/features/cart/cart.repository';
import type { ProductRepository } from '@/features/product/product.repository';
import { ProductMapper } from '@/features/product/product.mapper';

describe('CartService', () => {
  let service: CartService;

  let cartRepository: jest.Mocked<CartRepository>;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    cartRepository = {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      clear: jest.fn().mockResolvedValue(undefined),
    };

    productRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn().mockResolvedValue(undefined),
    };

    service = new CartService(cartRepository, productRepository);
  });

  describe('getCart', () => {
    it('should create a cart when one does not exist', async () => {
      cartRepository.find.mockResolvedValue(null);

      const createdCart = CartMapper.toEntity();

      cartRepository.create.mockResolvedValue(createdCart);

      const result = await service.getCart();
      expect(result.items).toHaveLength(0);
    });

    it('should return existing cart', async () => {
      const cart = CartMapper.toEntity();

      cartRepository.find.mockResolvedValue(cart);

      const result = await service.getCart();

      expect(cartRepository.create).not.toHaveBeenCalled();
      expect(result.id).toBe(cart.id);
    });
  });

  describe('addItem', () => {
    it('should add an item to the cart', async () => {
      const product = ProductMapper.toEntity({
        name: 'MacBook Pro',
        description: 'Laptop',
        price: 2500,
        stock: 10,
      });

      const cart = CartMapper.toEntity();

      productRepository.findById.mockResolvedValue(product);
      cartRepository.find.mockResolvedValue(cart);
      cartRepository.update.mockResolvedValue(cart);

      const result = await service.addItem({
        productId: product.id,
        quantity: 2,
      });

      expect(productRepository.findById).toHaveBeenCalledWith(product.id);
      expect(cartRepository.update).toHaveBeenCalledTimes(1);
      expect(result.items).toHaveLength(1);
    });

    it('should throw when product does not exist', async () => {
      productRepository.findById.mockResolvedValue(null);

      await expect(
        service.addItem({
          productId: '1',
          quantity: 1,
        }),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw when requested quantity exceeds stock', async () => {
      const product = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 5,
      });

      const cart = CartMapper.toEntity();

      cart.addItem(product.id, product.name, product.price, 4);

      productRepository.findById.mockResolvedValue(product);
      cartRepository.find.mockResolvedValue(cart);

      await expect(
        service.addItem({
          productId: product.id,
          quantity: 2,
        }),
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe('updateItem', () => {
    it('should update item quantity', async () => {
      const product = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 10,
      });

      const cart = CartMapper.toEntity();

      cart.addItem(product.id, product.name, product.price, 2);

      productRepository.findById.mockResolvedValue(product);
      cartRepository.find.mockResolvedValue(cart);
      cartRepository.update.mockResolvedValue(cart);

      const result = await service.updateItem(product.id, {
        quantity: 5,
      });

      expect(cartRepository.update).toHaveBeenCalledTimes(1);
      expect(result.items[0].quantity).toBe(5);
    });

    it('should throw when product does not exist', async () => {
      productRepository.findById.mockResolvedValue(null);

      await expect(
        service.updateItem('1', {
          quantity: 5,
        }),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw when item does not exist in cart', async () => {
      const product = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 10,
      });

      productRepository.findById.mockResolvedValue(product);
      cartRepository.find.mockResolvedValue(CartMapper.toEntity());

      await expect(
        service.updateItem(product.id, {
          quantity: 5,
        }),
      ).rejects.toThrow(NotFoundError);
    });

    it('should throw when quantity exceeds stock', async () => {
      const product = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 5,
      });

      const cart = CartMapper.toEntity();

      cart.addItem(product.id, product.name, product.price, 2);

      productRepository.findById.mockResolvedValue(product);
      cartRepository.find.mockResolvedValue(cart);

      await expect(
        service.updateItem(product.id, {
          quantity: 10,
        }),
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', async () => {
      const product = ProductMapper.toEntity({
        name: 'MacBook',
        description: 'Laptop',
        price: 100,
        stock: 5,
      });

      const cart = CartMapper.toEntity();

      cart.addItem(product.id, product.name, product.price, 2);

      cartRepository.find.mockResolvedValue(cart);
      cartRepository.update.mockResolvedValue(cart);

      const result = await service.removeItem(product.id);

      expect(cartRepository.update).toHaveBeenCalledTimes(1);
      expect(result.items).toHaveLength(0);
    });

    it('should throw when item does not exist', async () => {
      cartRepository.find.mockResolvedValue(CartMapper.toEntity());

      await expect(service.removeItem('1')).rejects.toThrow(NotFoundError);
    });
  });
});
