import { ApiResponse, ErrorResponse } from '@/shared';

import { CartService } from './cart.service';
import { addCartItemSchema, updateCartItemSchema } from './cart.validation';

class CartController {
  constructor(private readonly service: CartService) {}

  /**
   * Returns the current cart.
   */
  public async getCart(): Promise<Response> {
    try {
      const cart = await this.service.getCart();

      return ApiResponse.ok(cart);
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Adds an item to the cart.
   * @param request Incoming HTTP request.
   */

  public async addItem(request: Request): Promise<Response> {
    try {
      const body = await request.json();

      const payload = addCartItemSchema.parse(body);
      const cart = await this.service.addItem(payload);

      return ApiResponse.created(cart, 'Item added to cart successfully');
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Updates a cart item.
   * @param productId Product ID.
   * @param request Incoming HTTP request.
   */
  public async updateItem(
    productId: string,
    request: Request,
  ): Promise<Response> {
    try {
      const body = await request.json();

      const payload = updateCartItemSchema.parse(body);
      const cart = await this.service.updateItem(productId, payload);

      return ApiResponse.ok(cart, 'Cart updated successfully');
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Removes an item from the cart.
   * @param productId Product ID.
   */
  public async removeItem(productId: string): Promise<Response> {
    try {
      const cart = await this.service.removeItem(productId);

      return ApiResponse.ok(cart, 'Item removed successfully');
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }
}

export { CartController };
