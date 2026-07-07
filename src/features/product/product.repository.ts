import { ProductEntity } from './product.entity';

interface ProductRepository {
  /**
   * Stores a product.
   * @param product Product to store.
   */
  create(product: ProductEntity): Promise<ProductEntity>;

  /**
   * Finds a product by its ID.
   * @param id Product ID.
   */
  findById(id: string): Promise<ProductEntity | null>;

  /**
   * Finds a product by its name.
   * @param name Product name.
   */
  findByName(name: string): Promise<ProductEntity | null>;

  /**
   * Returns all products.
   */
  findAll(): Promise<ProductEntity[]>;

  /**
   * Updates a product.
   * @param product Product to update.
   */
  update(product: ProductEntity): Promise<ProductEntity>;

  /**
   * Deletes a product.
   * @param id Product ID.
   */
  delete(id: string): Promise<void>;
}

export type { ProductRepository };
