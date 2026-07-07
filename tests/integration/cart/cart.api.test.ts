import { API_BASE_URL } from '../setup';
import { addCartItem } from '../helpers/cart.helper';
import { createProduct } from '../helpers/product.helper';

const CART_BASE_URL = `${API_BASE_URL}/cart`;

/**
 * Resets the application state before each test to ensure
 * test isolation and deterministic results.
 */
beforeEach(async () => {
  const response = await fetch(`${API_BASE_URL}/testing/reset`, {
    method: 'POST',
  });

  expect(response.status).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
});

/**
 * Integration tests for the Cart API.
 *
 * These tests exercise the HTTP endpoints against a running application,
 * verifying request validation, response payloads, status codes, and
 * interactions with the persistence layer.
 */
describe('Cart API Integration', () => {
  describe('GET /api/cart', () => {
    it('should return an empty cart', async () => {
      const response = await fetch(CART_BASE_URL);

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.data.items).toEqual([]);
    });
  });

  describe('POST /api/cart', () => {
    it('should add an item to the cart', async () => {
      const product = await createProduct();

      const response = await fetch(CART_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 2,
        }),
      });

      expect(response.status).toBe(201);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.message).toBe('Item added to cart successfully');
      expect(body.data.items).toHaveLength(1);

      expect(body.data.items[0].productId).toBe(product.id);
      expect(body.data.items[0].productName).toBe(product.name);
      expect(body.data.items[0].unitPrice).toBe(product.price);
      expect(body.data.items[0].quantity).toBe(2);
    });

    it('should return 404 when product does not exist', async () => {
      const response = await fetch(CART_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: crypto.randomUUID(),
          quantity: 1,
        }),
      });

      expect(response.status).toBe(404);

      const body = await response.json();

      expect(body.success).toBe(false);
      expect(body.message).toBe('Product not found');
    });

    it('should return 400 when quantity exceeds stock', async () => {
      const product = await createProduct({
        stock: 5,
      });

      const response = await fetch(CART_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 10,
        }),
      });

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body.success).toBe(false);
    });
  });

  describe('PUT /api/cart/items/:productId', () => {
    it('should update item quantity', async () => {
      const product = await createProduct();

      await addCartItem(product.id, 2);

      const response = await fetch(`${CART_BASE_URL}/items/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 3,
        }),
      });

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.message).toBe('Cart updated successfully');

      expect(body.data.items).toHaveLength(1);
      expect(body.data.items[0].quantity).toBe(3);
    });

    it('should return 400 when quantity exceeds stock', async () => {
      const product = await createProduct({
        stock: 5,
      });

      await addCartItem(product.id, 2);

      const response = await fetch(`${CART_BASE_URL}/items/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 100,
        }),
      });

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body.success).toBe(false);
    });

    it('should return 404 when item does not exist', async () => {
      const product = await createProduct();

      const response = await fetch(`${CART_BASE_URL}/items/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: 2,
        }),
      });

      expect(response.status).toBe(404);

      const body = await response.json();

      expect(body.success).toBe(false);
      expect(body.message).toBe('Item not found in cart');
    });
  });

  describe('DELETE /api/cart/items/:productId', () => {
    it('should remove an item from the cart', async () => {
      const product = await createProduct();

      await addCartItem(product.id, 2);

      const response = await fetch(`${CART_BASE_URL}/items/${product.id}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.message).toBe('Item removed successfully');
      expect(body.data.items).toHaveLength(0);
    });

    it('should return 404 when item does not exist', async () => {
      const product = await createProduct();

      const response = await fetch(`${CART_BASE_URL}/items/${product.id}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(404);

      const body = await response.json();

      expect(body.success).toBe(false);
      expect(body.message).toBe('Item not found in cart');
    });
  });

  describe('GET /api/cart', () => {
    it('should return cart with added items', async () => {
      const product = await createProduct();

      await addCartItem(product.id, 2);

      const response = await fetch(CART_BASE_URL);

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.data.items).toHaveLength(1);

      expect(body.data.items[0].productId).toBe(product.id);
      expect(body.data.items[0].quantity).toBe(2);
    });
  });
});
