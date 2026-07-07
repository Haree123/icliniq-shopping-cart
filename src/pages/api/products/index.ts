import type { APIRoute } from 'astro';

import { productController } from '@/features/product/product.module';

export const GET: APIRoute = () => productController.findAll();

export const POST: APIRoute = ({ request }) =>
  productController.create(request);