import { productRepository } from '../product/product.module';

import { CartController } from './cart.controller';
import { InMemoryCartRepository } from './cart.in-memory.repository';
import { CartService } from './cart.service';

export const cartRepository = new InMemoryCartRepository();
const cartService = new CartService(cartRepository, productRepository);
export const cartController = new CartController(cartService);
