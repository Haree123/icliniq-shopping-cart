import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from '@/types/product';

import { request } from './client';

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('/products');
}

export function getProductById(id: string): Promise<Product> {
  return request<Product>(`/products/${id}`);
}

export function createProduct(payload: CreateProductRequest): Promise<Product> {
  return request<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateProductById(
  id: string,
  payload: UpdateProductRequest,
): Promise<Product> {
  return request<Product>(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteProductById(id: string): Promise<void> {
  await request(`/products/${id}`, {
    method: 'DELETE',
  });
}
