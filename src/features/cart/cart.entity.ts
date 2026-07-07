import { BadRequestError } from '@/shared/index';

import type { Cart, CartItem } from './cart.types';

class CartEntity implements Cart {
  constructor(
    public readonly id: string,
    public readonly items: CartItem[] = [],
  ) {}

  /**
   * Adds an item to the cart.
   *
   * If the item already exists, its quantity is increased.
   *
   * @param productId Product ID.
   * @param productName Product name.
   * @param unitPrice Product unit price.
   * @param quantity Quantity to add.
   */
  public addItem(
    productId: string,
    productName: string,
    unitPrice: number,
    quantity: number,
  ): void {
    const existingItem = this.items.find(
      (item) => item.productId === productId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      return;
    }

    this.items.push({
      productId,
      productName,
      unitPrice,
      quantity,
    });
  }

  /**
   * Updates the quantity of a cart item.
   *
   * The item must already exist in the cart.
   *
   * @param productId Product ID.
   * @param quantity New quantity.
   * @throws {BadRequestError} If the item does not exist in the cart.
   */
  public updateQuantity(productId: string, quantity: number): void {
    const item = this.items.find((item) => item.productId === productId);
    if (!item) throw new BadRequestError('Item does not exist in cart');

    item.quantity = quantity;
  }

  /**
   * Removes an item from the cart.
   *
   * The item must already exist in the cart.
   *
   * @param productId Product ID.
   * @throws {BadRequestError} If the item does not exist in the cart.
   */
  public removeItem(productId: string): void {
    const index = this.items.findIndex((item) => item.productId === productId);
    if (index === -1) throw new BadRequestError('Item does not exist in cart');

    this.items.splice(index, 1);
  }

  /**
   * Removes all items from the cart.
   */
  public clear(): void {
    this.items.length = 0;
  }
}

export { CartEntity };
