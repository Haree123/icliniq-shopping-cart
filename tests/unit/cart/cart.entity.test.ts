import { BadRequestError } from '@/shared';

import { CartEntity } from '@/features/cart/cart.entity';

describe('CartEntity', () => {
  let cart: CartEntity;

  beforeEach(() => {
    cart = new CartEntity('cart-1');
  });

  describe('addItem', () => {
    it('should add a new item to the cart', () => {
      cart.addItem('product-1', 'MacBook Pro', 2500, 2);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0]).toEqual({
        productId: 'product-1',
        productName: 'MacBook Pro',
        unitPrice: 2500,
        quantity: 2,
      });
    });

    it('should increase quantity when item already exists', () => {
      cart.addItem('product-1', 'MacBook Pro', 2500, 2);
      cart.addItem('product-1', 'MacBook Pro', 2500, 3);

      expect(cart.items).toHaveLength(1);
      expect(cart.items[0].quantity).toBe(5);
    });
  });

  describe('updateQuantity', () => {
    beforeEach(() => {
      cart.addItem('product-1', 'MacBook Pro', 2500, 2);
    });

    it('should update item quantity', () => {
      cart.updateQuantity('product-1', 5);

      expect(cart.items[0].quantity).toBe(5);
    });

    it('should throw when item does not exist', () => {
      expect(() => {
        cart.updateQuantity('product-2', 5);
      }).toThrow(BadRequestError);
    });
  });

  describe('removeItem', () => {
    beforeEach(() => {
      cart.addItem('product-1', 'MacBook Pro', 2500, 2);
    });

    it('should remove an existing item', () => {
      cart.removeItem('product-1');

      expect(cart.items).toHaveLength(0);
    });

    it('should throw when item does not exist', () => {
      expect(() => {
        cart.removeItem('product-2');
      }).toThrow(BadRequestError);
    });
  });

  describe('clear', () => {
    it('should remove all items from the cart', () => {
      cart.addItem('product-1', 'MacBook Pro', 2500, 2);
      cart.addItem('product-2', 'iPhone 16', 1200, 1);

      cart.clear();

      expect(cart.items).toHaveLength(0);
    });
  });
});
