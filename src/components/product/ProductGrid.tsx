import ProductCard from './ProductCard';
import EmptyProducts from './EmptyProduct';

import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;

  onAddToCart: (productId: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

function ProductGrid({
  products,
  loading = false,
  onAddToCart,
  onEdit,
  onDelete,
}: ProductGridProps) {
  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <section
      className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          loading={loading}
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default ProductGrid;
