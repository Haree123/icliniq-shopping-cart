import { ApiResponse, ErrorResponse } from '@/shared';

import { ProductService } from './product.service';
import { createProductSchema, updateProductSchema } from './product.validation';

class ProductController {
  constructor(private readonly service: ProductService) {}

  /**
   * Creates a new product.
   * @param request Incoming HTTP request.
   */
  public async create(request: Request): Promise<Response> {
    try {
      const body = await request.json();

      const payload = createProductSchema.parse(body);

      const product = await this.service.create(payload);

      return ApiResponse.created(product, 'Product created successfully');
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Returns all products.
   */
  public async findAll(): Promise<Response> {
    try {
      const products = await this.service.findAll();

      return ApiResponse.ok(products);
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Returns a product by its ID.
   * @param id Product ID.
   */
  public async findById(id: string): Promise<Response> {
    try {
      const product = await this.service.findById(id);

      return ApiResponse.ok(product);
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Updates a product.
   * @param id Product ID.
   * @param request Incoming HTTP request.
   */
  public async update(id: string, request: Request): Promise<Response> {
    try {
      const body = await request.json();

      const payload = updateProductSchema.parse(body);

      const product = await this.service.update(id, payload);

      return ApiResponse.ok(product, 'Product updated successfully');
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }

  /**
   * Deletes a product.
   * @param id Product ID.
   */
  public async delete(id: string): Promise<Response> {
    try {
      await this.service.delete(id);

      return ApiResponse.ok(null, 'Product deleted successfully');
    } catch (error) {
      return ErrorResponse.from(error);
    }
  }
}

export { ProductController };
