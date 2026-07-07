import { API_BASE_URL } from '../setup';
import {
  createDuplicateProduct,
  createProduct,
} from '../helpers/product.helper';

const BASE_URL = `${API_BASE_URL}/products`;

/**
 * Integration tests for the Product API.
 *
 * These tests verify the product endpoints against a running application,
 * including request validation, response payloads, status codes, and
 * persistence behavior.
 */
describe('Product API Integration', () => {
  /**
   * Resets the application state before each test to ensure
   * test isolation and deterministic results.
   */
  beforeEach(async () => {
    const response = await fetch(`${API_BASE_URL}/testing/reset`, {
      method: 'POST',
    });

    expect(response.status).toBe(200);
  });

  describe('POST /api/products', () => {
    it('should create a product', async () => {
      const product = await createProduct({
        name: 'MacBook Pro',
        description: 'Apple Laptop',
        price: 2500,
        stock: 10,
      });

      expect(product.name).toBe('MacBook Pro');
      expect(product.description).toBe('Apple Laptop');
      expect(product.price).toBe(2500);
      expect(product.stock).toBe(10);
    });

    it('should return 409 for duplicate product', async () => {
      const payload = await createDuplicateProduct();

      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      expect(response.status).toBe(409);

      const body = await response.json();

      expect(body.success).toBe(false);
      expect(body.message).toBe('Product already exists');
    });

    it('should return 400 for invalid payload', async () => {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '',
          description: '',
          price: -100,
          stock: -1,
        }),
      });

      expect(response.status).toBe(400);

      const body = await response.json();

      expect(body.success).toBe(false);
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      await createProduct();

      const response = await fetch(BASE_URL);

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product by id', async () => {
      const product = await createProduct();

      const response = await fetch(`${BASE_URL}/${product.id}`);

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.data.id).toBe(product.id);
      expect(body.data.name).toBe(product.name);
    });

    it('should return 404 for unknown product', async () => {
      const response = await fetch(`${BASE_URL}/${crypto.randomUUID()}`);

      expect(response.status).toBe(404);

      const body = await response.json();

      expect(body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id', () => {
    it('should update a product', async () => {
      const product = await createProduct();

      const response = await fetch(`${BASE_URL}/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: 3000,
          stock: 20,
        }),
      });

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.message).toBe('Product updated successfully');
      expect(body.data.price).toBe(3000);
      expect(body.data.stock).toBe(20);
    });

    it('should return 404 for unknown product', async () => {
      const response = await fetch(`${BASE_URL}/${crypto.randomUUID()}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: 500,
        }),
      });

      expect(response.status).toBe(404);

      const body = await response.json();

      expect(body.success).toBe(false);
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('should delete a product', async () => {
      const product = await createProduct();

      const response = await fetch(`${BASE_URL}/${product.id}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.success).toBe(true);
      expect(body.message).toBe('Product deleted successfully');
    });

    it('should return 404 for already deleted product', async () => {
      const product = await createProduct();

      await fetch(`${BASE_URL}/${product.id}`, {
        method: 'DELETE',
      });

      const response = await fetch(`${BASE_URL}/${product.id}`, {
        method: 'DELETE',
      });

      expect(response.status).toBe(404);

      const body = await response.json();

      expect(body.success).toBe(false);
      expect(body.message).toBe('Product not found');
    });
  });
});
