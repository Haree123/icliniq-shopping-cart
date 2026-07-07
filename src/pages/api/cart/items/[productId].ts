import type { APIRoute } from 'astro';

import { cartController } from '@/features/cart/cart.module';

export const PUT: APIRoute = ({ params, request }) =>
  cartController.updateItem(params.productId!, request);

export const DELETE: APIRoute = ({ params }) =>
  cartController.removeItem(params.productId!);
