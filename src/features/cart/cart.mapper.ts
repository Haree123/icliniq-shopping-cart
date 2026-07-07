import { CartEntity } from './cart.entity';
import type { AddCartItemRequest, CartResponse } from './cart.types';

class CartMapper {
  /**
   * Creates a new cart entity.
   */
  public static toEntity(): CartEntity {
    return new CartEntity(crypto.randomUUID(), []);
  }

  /**
   * Maps a cart entity to a response model.
   * @param cart Cart entity.
   */
  public static toResponse(cart: CartEntity): CartResponse {
    return { id: cart.id, items: cart.items };
  }

  /**
   * Maps a payload to an add item request.
   * @param payload Add item request.
   */
  public static toAddItemRequest(
    payload: AddCartItemRequest,
  ): AddCartItemRequest {
    return payload;
  }
}

export { CartMapper };
