import { z } from 'zod';

export const addCartItemSchema = z.object({
  productId: z
    .string({
      error: 'Product ID is required',
    })
    .trim()
    .min(1, 'Product ID is required'),

  quantity: z
    .number({
      error: 'Quantity must be a number',
    })
    .int('Quantity must be an integer')
    .positive('Quantity must be greater than zero'),
});

export const updateCartItemSchema = z.object({
  quantity: z
    .number({
      error: 'Quantity must be a number',
    })
    .int('Quantity must be an integer')
    .positive('Quantity must be greater than zero'),
});
