import type { APIRoute } from 'astro';

import { cartRepository, productRepository } from '@/features';

export const POST: APIRoute = async () => {
  await productRepository.clear();
  await cartRepository.clear();

  return Response.json(
    {
      success: true,
      message: 'Repositories cleared',
    },
    {
      status: 200,
    },
  );
};
