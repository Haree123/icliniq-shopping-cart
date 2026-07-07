import type { APIRoute } from 'astro';

import { cartController } from '@/features/cart/cart.module';

export const GET: APIRoute = () => cartController.getCart();

export const POST: APIRoute = ({ request }) => cartController.addItem(request);
