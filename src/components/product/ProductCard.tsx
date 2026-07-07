import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/format';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
}

function ProductCard({
  product,
  loading = false,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="line-clamp-2">{product.name}</CardTitle>

          <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {product.description}
        </p>

        <p className="mt-6 text-2xl font-bold">
          {formatCurrency(product.price)}
        </p>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          disabled={loading || product.stock === 0}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />

          {loading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
