import { CartEntity } from './cart.entity';
import type { CartRepository } from './cart.repository';

class InMemoryCartRepository implements CartRepository {
  private cart: CartEntity | null = null;

  /**
   * Stores a cart.
   * @param cart Cart to store.
   */
  public async create(cart: CartEntity): Promise<CartEntity> {
    this.cart = cart;

    return cart;
  }

  /**
   * Returns the stored cart.
   */
  public async find(): Promise<CartEntity | null> {
    return this.cart;
  }

  /**
   * Updates the stored cart.
   * @param cart Cart to update.
   */
  public async update(cart: CartEntity): Promise<CartEntity> {
    this.cart = cart;

    return cart;
  }

  /**
   * Removes the stored cart.
   */
  public async clear(): Promise<void> {
    this.cart = null;
  }
}

export { InMemoryCartRepository };
