import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '@/lib/api/product.api';

import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from '@/types/product';

class ProductService {
  /**
   * Returns all products.
   */
  public async findAll(): Promise<Product[]> {
    return getProducts();
  }

  /**
   * Returns a product by id.
   */
  public async findById(id: string): Promise<Product> {
    return getProductById(id);
  }

  /**
   * Creates a product.
   */
  public async create(payload: CreateProductRequest): Promise<Product> {
    return createProduct(payload);
  }

  /**
   * Updates a product.
   */
  public async update(
    id: string,
    payload: UpdateProductRequest,
  ): Promise<Product> {
    return updateProductById(id, payload);
  }

  /**
   * Deletes a product.
   */
  public async delete(id: string): Promise<void> {
    await deleteProductById(id);
  }
}

export const productService = new ProductService();
