import type {
  AddCartItemRequest,
  Cart,
  UpdateCartItemRequest,
} from '@/types/cart';

import { request } from './client';

export function getCart(): Promise<Cart> {
  return request<Cart>('/cart');
}

export function addToCart(payload: AddCartItemRequest): Promise<Cart> {
  return request<Cart>('/cart', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateCartItem(
  productId: string,
  payload: UpdateCartItemRequest,
): Promise<Cart> {
  return request<Cart>(`/cart/items/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function removeCartItem(productId: string): Promise<Cart> {
  return request<Cart>(`/cart/items/${productId}`, {
    method: 'DELETE',
  });
}
