import { CartEntity } from './cart.entity';

interface CartRepository {
  /**
   * Stores a cart.
   * @param cart Cart to store.
   */
  create(cart: CartEntity): Promise<CartEntity>;

  /**
   * Returns the current cart.
   */
  find(): Promise<CartEntity | null>;

  /**
   * Updates the current cart.
   * @param cart Cart to update.
   */
  update(cart: CartEntity): Promise<CartEntity>;

  /**
   * Removes the current cart.
   */
  clear(): Promise<void>;
}

export type { CartRepository };
