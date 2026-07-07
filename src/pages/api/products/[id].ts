import type { APIRoute } from 'astro';

import { productController } from '@/features/product/product.module';

export const GET: APIRoute = ({ params }) =>
  productController.findById(params.id!);

export const PUT: APIRoute = ({ params, request }) =>
  productController.update(params.id!, request);

export const DELETE: APIRoute = ({ params }) =>
  productController.delete(params.id!);