import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import type { CreateProductRequest } from '@/types/product';

interface ProductFormProps {
  loading?: boolean;
  onSubmit: (payload: CreateProductRequest) => Promise<void>;
}

const INITIAL_FORM: CreateProductRequest = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
};

/**
 * Form component for creating a new product.
 *
 * Manages local form state and sends the completed product payload
 * to the parent component through the onSubmit callback.
 */
function ProductForm({ loading = false, onSubmit }: ProductFormProps) {
  const [form, setForm] = useState<CreateProductRequest>(INITIAL_FORM);

  function updateField<K extends keyof CreateProductRequest>(
    key: K,
    value: CreateProductRequest[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit(form);

    setForm(INITIAL_FORM);
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Product name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            required
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            required
          />

          <Input
            type="number"
            placeholder="Price"
            value={form.price || ''}
            min={0}
            onChange={(event) =>
              updateField('price', Number(event.target.value))
            }
            required
          />

          <Input
            type="number"
            placeholder="Stock"
            value={form.stock || ''}
            min={0}
            onChange={(event) =>
              updateField('stock', Number(event.target.value))
            }
            required
          />

          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ProductForm;
