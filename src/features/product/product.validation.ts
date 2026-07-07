import { z } from 'zod';

export const createProductSchema = z.object({
  name: z
    .string({
      error: 'Product name is required',
    })
    .trim()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name cannot exceed 100 characters'),

  description: z
    .string({
      error: 'Description is required',
    })
    .trim()
    .min(5, 'Description must be at least 5 characters')
    .max(500, 'Description cannot exceed 500 characters'),

  price: z
    .number({
      error: 'Price must be a number',
    })
    .positive('Price must be greater than zero'),

  stock: z
    .number({
      error: 'Stock must be a number',
    })
    .int('Stock must be an integer')
    .min(0, 'Stock cannot be negative'),
});

export const updateProductSchema = createProductSchema.partial();
