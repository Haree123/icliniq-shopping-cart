import ProductCard from './ProductCard';
import EmptyProducts from './EmptyProduct';

import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onAddToCart?: (product: Product) => void;
}

function ProductGrid({
  products,
  loading = false,
  onAddToCart,
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
        />
      ))}
    </section>
  );
}

export default ProductGrid;
