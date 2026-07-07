import { BadRequestError } from '@/shared';

import type { Product } from './product.types';

class ProductEntity implements Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public active: boolean = true,
  ) {
    this.validate();
  }

  /**
   * Updates the product name.
   * @param name Product name.
   */
  public updateName(name: string): void {
    this.name = name;
  }

  /**
   * Updates the product description.
   * @param description Product description.
   */
  public updateDescription(description: string): void {
    this.description = description;
  }

  /**
   * Updates the product price.
   *
   * Price must be greater than zero.
   *
   * @param price Product price.
   * @throws {Error} If the price is less than or equal to zero.
   */
  public updatePrice(price: number): void {
    if (price <= 0) throw new BadRequestError('Price must be greater than zero');
    this.price = price;
  }

  /**
   * Updates the product stock.
   *
   * Stock cannot be negative.
   *
   * @param stock Product stock.
   * @throws {Error} If the stock is negative.
   */

  public updateStock(stock: number): void {
    if (stock < 0) throw new BadRequestError('Stock cannot be negative');
    this.stock = stock;
  }

  /**
   * Activates the product.
   */
  public activate(): void {
    this.active = true;
  }

  /**
   * Deactivates the product.
   */
  public deactivate(): void {
    this.active = false;
  }

  /**
   * Validates the product state.
   *
   * Rules:
   * - Name is required.
   * - Price must be greater than zero.
   * - Stock cannot be negative.
   *
   * @throws {Error} If any validation rule is violated.
   */
  private validate(): void {
    if (!this.name.trim()) throw new BadRequestError('Product name is required');
    if (this.price <= 0) throw new BadRequestError('Price must be greater than zero');
    if (this.stock < 0) throw new BadRequestError('Stock cannot be negative');
  }
}

export { ProductEntity };
