import { ConflictError, NotFoundError } from '@/shared';

import { ProductMapper } from './product.mapper';
import type { ProductRepository } from './product.repository';
import type {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
} from './product.types';

class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  /**
   * Creates a product.
   *
   * @param payload Product creation request.
   * @throws {ConflictError} If a product with the same name already exists.
   */
  public async create(payload: CreateProductRequest): Promise<ProductResponse> {
    const existingProduct = await this.repository.findByName(payload.name);
    if (existingProduct) throw new ConflictError('Product already exists');

    const product = ProductMapper.toEntity(payload);
    const createdProduct = await this.repository.create(product);

    return ProductMapper.toResponse(createdProduct);
  }

  /**
   * Returns all products.
   */
  public async findAll(): Promise<ProductResponse[]> {
    const products = await this.repository.findAll();

    return ProductMapper.toResponseList(products);
  }

  /**
   * Returns a product by its ID.
   *
   * @param id Product ID.
   * @throws {NotFoundError} If the product is not found.
   */

  public async findById(id: string): Promise<ProductResponse> {
    const product = await this.repository.findById(id);

    if (!product) throw new NotFoundError('Product not found');
    return ProductMapper.toResponse(product);
  }

  /**
   * Updates a product.
   *
   * @param id Product ID.
   * @param payload Product update request.
   * @throws {NotFoundError} If the product is not found.
   * @throws {ConflictError} If another product with the same name already exists.
   */
  public async update(
    id: string,
    payload: UpdateProductRequest,
  ): Promise<ProductResponse> {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundError('Product not found');

    if (
      payload.name !== undefined &&
      payload.name.toLowerCase() !== product.name.toLowerCase()
    ) {
      const existingProduct = await this.repository.findByName(payload.name);
      if (existingProduct) throw new ConflictError('Product already exists');

      product.updateName(payload.name);
    }

    if (payload.description !== undefined)
      product.updateDescription(payload.description);
    if (payload.price !== undefined) product.updatePrice(payload.price);
    if (payload.stock !== undefined) product.updateStock(payload.stock);

    const updatedProduct = await this.repository.update(product);
    return ProductMapper.toResponse(updatedProduct);
  }

  /**
   * Deletes a product.
   *
   * @param id Product ID.
   * @throws {NotFoundError} If the product is not found.
   */
  public async delete(id: string): Promise<void> {
    const product = await this.repository.findById(id);

    if (!product) throw new NotFoundError('Product not found');
    await this.repository.delete(id);
  }
}

export { ProductService };
