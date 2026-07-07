import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { Product, UpdateProductRequest } from '@/types/product';

interface EditProductDialogProps {
  open: boolean;
  product: Product | null;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (productId: string, payload: UpdateProductRequest) => Promise<void>;
}

/**
 * Dialog component for editing an existing product.
 *
 * Populates the form with the selected product data and allows users
 * to update product fields before submitting changes.
 *
 * Handles form state internally and delegates persistence to the
 * provided save callback.
 *
 * @param props Dialog state, product data, and update handler.
 */
function EditProductDialog({
  open,
  product,
  loading = false,
  onOpenChange,
  onSave,
}: EditProductDialogProps) {
  const [form, setForm] = useState<UpdateProductRequest>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }, [product]);

  function updateField<K extends keyof UpdateProductRequest>(
    key: K,
    value: UpdateProductRequest[K],
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!product) return;

    await onSave(product.id, form);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Product Name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
          />

          <Input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => updateField('price', Number(e.target.value))}
          />

          <Input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => updateField('stock', Number(e.target.value))}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;
