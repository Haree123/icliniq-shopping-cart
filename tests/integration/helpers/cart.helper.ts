import { API_BASE_URL } from '../setup';

const CART_BASE_URL = `${API_BASE_URL}/cart`;

/**
 * Adds a product to the cart through the Cart API.
 *
 * This helper asserts that the request succeeds with a `201 Created`
 * response and returns the created cart data.
 *
 * @param productId The ID of the product to add.
 * @param quantity The quantity to add to the cart. Defaults to `1`.
 * @returns The updated cart returned by the API.
 */
export async function addCartItem(productId: string, quantity = 1) {
  const response = await fetch(CART_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  expect(response.status).toBe(201);
  const body = await response.json();
  return body.data;
}
