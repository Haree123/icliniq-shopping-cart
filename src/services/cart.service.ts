import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '@/lib/api/cart.api';

import type {
  AddCartItemRequest,
  Cart,
  UpdateCartItemRequest,
} from '@/types/cart';

class CartService {
  /**
   * Returns the shopping cart.
   */
  public async get(): Promise<Cart> {
    return getCart();
  }

  /**
   * Adds an item to the cart.
   */
  public async addItem(payload: AddCartItemRequest): Promise<Cart> {
    return addToCart(payload);
  }

  /**
   * Updates the quantity of an item.
   */
  public async updateItem(
    productId: string,
    payload: UpdateCartItemRequest,
  ): Promise<Cart> {
    return updateCartItem(productId, payload);
  }

  /**
   * Removes an item from the cart.
   */
  public async removeItem(productId: string): Promise<Cart> {
    return removeCartItem(productId);
  }
}

export const cartService = new CartService();
