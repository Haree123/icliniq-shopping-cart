import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { InMemoryProductRepository } from './product.in-memory.repository';

export const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
export const productController = new ProductController(productService);
