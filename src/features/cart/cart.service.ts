import { BadRequestError, NotFoundError } from '@/shared';

import type { ProductRepository } from '../product/product.repository';

import { CartMapper } from './cart.mapper';
import type { CartEntity } from './cart.entity';
import type { CartRepository } from './cart.repository';
import type {
  AddCartItemRequest,
  CartResponse,
  UpdateCartItemRequest,
} from './cart.types';

class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  /**
   * Returns the current cart.
   *
   * Creates a new cart if one does not exist.
   */
  public async getCart(): Promise<CartResponse> {
    let cart = await this.cartRepository.find();

    if (!cart) {
      cart = CartMapper.toEntity();
      await this.cartRepository.create(cart);
    }

    return CartMapper.toResponse(cart);
  }

  /**
   * Adds an item to the cart.
   *
   * The requested quantity cannot exceed the available product stock.
   *
   * @param payload Add item request.
   * @throws {NotFoundError} If the product does not exist.
   * @throws {BadRequestError} If the requested quantity exceeds available stock.
   */
  public async addItem(payload: AddCartItemRequest): Promise<CartResponse> {
    const product = await this.productRepository.findById(payload.productId);
    if (!product) throw new NotFoundError('Product not found');

    let cart = await this.cartRepository.find();

    if (!cart) {
      cart = CartMapper.toEntity();
      await this.cartRepository.create(cart);
    }

    const existingItem = cart.items.find(
      (item) => item.productId === payload.productId,
    );

    const currentQuantity = existingItem?.quantity ?? 0;
    const requestedQuantity = currentQuantity + payload.quantity;

    if (requestedQuantity > product.stock) {
      throw new BadRequestError(
        `Only ${product.stock} item(s) available in stock`,
      );
    }

    cart.addItem(product.id, product.name, product.price, payload.quantity);
    const updatedCart = await this.cartRepository.update(cart);

    return CartMapper.toResponse(updatedCart);
  }

  /**
   * Updates the quantity of a cart item.
   *
   * The updated quantity cannot exceed the available product stock.
   *
   * @param productId Product ID.
   * @param payload Cart item update request.
   * @throws {NotFoundError} If the product or cart item does not exist.
   * @throws {BadRequestError} If the requested quantity exceeds available stock.
   */
  public async updateItem(
    productId: string,
    payload: UpdateCartItemRequest,
  ): Promise<CartResponse> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new NotFoundError('Product not found');

    const cart = await this.getExistingCart();

    const existingItem = cart.items.find(
      (item) => item.productId === productId,
    );

    if (!existingItem) throw new NotFoundError('Item not found in cart');

    if (payload.quantity > product.stock)
      throw new BadRequestError(
        `Only ${product.stock} item(s) available in stock`,
      );

    cart.updateQuantity(productId, payload.quantity);
    const updatedCart = await this.cartRepository.update(cart);

    return CartMapper.toResponse(updatedCart);
  }

  /**
   * Removes an item from the cart.
   *
   * @param productId Product ID.
   * @throws {NotFoundError} If the cart item does not exist.
   */
  public async removeItem(productId: string): Promise<CartResponse> {
    const cart = await this.getExistingCart();

    const existingItem = cart.items.find(
      (item) => item.productId === productId,
    );

    if (!existingItem) throw new NotFoundError('Item not found in cart');

    cart.removeItem(productId);
    const updatedCart = await this.cartRepository.update(cart);

    return CartMapper.toResponse(updatedCart);
  }

  /**
   * Returns the existing cart.
   *
   * @throws {BadRequestError} If no cart exists.
   */
  private async getExistingCart(): Promise<CartEntity> {
    const cart = await this.cartRepository.find();
    if (!cart) throw new BadRequestError('Cart not found');

    return cart;
  }
}

export { CartService };
