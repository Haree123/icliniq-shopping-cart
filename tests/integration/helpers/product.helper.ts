import { API_BASE_URL } from '../setup';

const PRODUCT_BASE_URL = `${API_BASE_URL}/products`;

/**
 * Creates a product through the Product API.
 *
 * Uses a default valid payload and allows individual fields to be
 * overridden. This helper asserts that the request succeeds with a
 * `201 Created` response and returns the created product.
 *
 * @param overrides Partial product properties to override the default payload.
 * @returns The created product returned by the API.
 */
export async function createProduct(overrides = {}) {
  const payload = {
    name: `Product-${crypto.randomUUID()}`,
    description: 'Integration Test Product',
    price: 100,
    stock: 10,
    ...overrides,
  };

  const response = await fetch(PRODUCT_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  expect(response.status).toBe(201);

  const body = await response.json();

  return body.data;
}

/**
 * Creates a product and returns the same payload so it can be reused
 * to verify duplicate product validation.
 *
 * @returns The payload used to create the initial product.
 */
export async function createDuplicateProduct() {
  const payload = {
    name: `Product-${crypto.randomUUID()}`,
    description: 'Integration Test Product',
    price: 100,
    stock: 10,
  };

  await fetch(PRODUCT_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return payload;
}
