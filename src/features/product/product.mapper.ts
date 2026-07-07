import { ProductEntity } from './product.entity';
import type { CreateProductRequest, ProductResponse } from './product.types';

class ProductMapper {
  /**
   * Creates a product entity from a request payload.
   * @param payload Product creation request.
   */
  public static toEntity(payload: CreateProductRequest): ProductEntity {
    return new ProductEntity(
      crypto.randomUUID(),
      payload.name,
      payload.description,
      payload.price,
      payload.stock,
      true,
    );
  }

  /**
   * Maps a product entity to a response model.
   * @param product Product entity.
   */
  public static toResponse(product: ProductEntity): ProductResponse {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      active: product.active,
    };
  }

  /**
   * Maps product entities to response models.
   * @param products Product entities.
   */
  public static toResponseList(products: ProductEntity[]): ProductResponse[] {
    return products.map(ProductMapper.toResponse);
  }
}

export { ProductMapper };
