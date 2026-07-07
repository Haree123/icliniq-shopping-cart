import { ProductEntity } from './product.entity';
import type { ProductRepository } from './product.repository';

class InMemoryProductRepository implements ProductRepository {
  private readonly products = new Map<string, ProductEntity>();

  /**
   * Stores a product.
   * @param product Product to store.
   */
  public async create(product: ProductEntity): Promise<ProductEntity> {
    this.products.set(product.id, product);

    return product;
  }

  /**
   * Finds a product by its ID.
   * @param id Product ID.
   */
  public async findById(id: string): Promise<ProductEntity | null> {
    return this.products.get(id) ?? null;
  }

  /**
   * Finds a product by its name.
   * @param name Product name.
   */
  public async findByName(name: string): Promise<ProductEntity | null> {
    const product = Array.from(this.products.values()).find(
      (product) => product.name.toLowerCase() === name.toLowerCase(),
    );

    return product ?? null;
  }

  /**
   * Returns all products.
   */
  public async findAll(): Promise<ProductEntity[]> {
    return Array.from(this.products.values());
  }

  /**
   * Updates a product.
   * @param product Product to update.
   */
  public async update(product: ProductEntity): Promise<ProductEntity> {
    this.products.set(product.id, product);

    return product;
  }

  /**
   * Deletes a product.
   * @param id Product ID.
   */
  public async delete(id: string): Promise<void> {
    this.products.delete(id);
  }
}

export { InMemoryProductRepository };
