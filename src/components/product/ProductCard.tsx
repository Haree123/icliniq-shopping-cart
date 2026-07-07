import { Pencil, ShoppingCart, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
  onAddToCart: (productId: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

/**
 * Displays product information and provides actions for cart,
 * edit, and delete operations.
 *
 * Shows the product name, description, price, and current stock,
 * while disabling actions when the product is unavailable or
 * an operation is in progress.
 *
 * @param props Product data and action callbacks.
 */
function ProductCard({
  product,
  loading = false,
  onAddToCart,
  onEdit,
  onDelete,
}: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle>{product.name}</CardTitle>

          <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
            Stock: {product.stock}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">{product.description}</p>

        <p className="text-2xl font-bold">₹ {product.price}</p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full"
          disabled={loading || product.stock === 0}
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            className="flex-1"
            disabled={loading}
            onClick={() => onEdit(product)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>

          <Button
            variant="destructive"
            className="flex-1"
            disabled={loading}
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
