import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import Header from '@/components/common/Header';
import CartSheet from '@/components/cart/CartSheet';
import AppToaster from '@/components/common/AppToaster';
import ErrorState from '@/components/common/ErrorState';
import ProductGrid from '@/components/product/ProductGrid';
import ProductForm from '@/components/product/ProductForm';
import EditProductDialog from '@/components/product/EditProductDialog';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';

import { cartService } from '@/services/cart.service';
import { productService } from '@/services/product.service';

import type { Cart } from '@/types/cart';
import type {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from '@/types/product';

/**
 * Main shopping cart page component.
 *
 * Coordinates product management and cart operations including:
 * - loading initial product and cart data
 * - creating, updating, and deleting products
 * - adding, updating, and removing cart items
 * - managing loading, error, and dialog states
 */
function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  /**
   * Loads the initial product list and cart data in parallel.
   *
   * Updates application state after successful retrieval and
   * handles initialization errors.
   */
  async function initialize() {
    try {
      setLoading(true);

      const [productsResponse, cartResponse] = await Promise.all([
        productService.findAll(),
        cartService.get(),
      ]);

      setProducts(productsResponse);
      setCart(cartResponse);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Something went wrong.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function refreshProducts() {
    const products = await productService.findAll();
    setProducts(products);
  }

  async function refreshCart() {
    const cart = await cartService.get();
    setCart(cart);
  }

  function handleEditProduct(product: Product) {
    setSelectedProduct(product);
  }

  async function handleAddToCart(product: Product) {
    try {
      setProcessing(true);

      await cartService.addItem({
        productId: product.id,
        quantity: 1,
      });

      await Promise.all([refreshProducts(), refreshCart()]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add item.',
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleCreateProduct(payload: CreateProductRequest) {
    try {
      setProcessing(true);

      await productService.create(payload);

      toast.success('Product created successfully');

      await refreshProducts();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create product.',
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleDeleteProduct(productId: string) {
    try {
      setProcessing(true);

      await productService.delete(productId);

      await refreshProducts();

      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete product',
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleUpdateProduct(
    productId: string,
    payload: UpdateProductRequest,
  ) {
    try {
      setProcessing(true);

      await productService.update(productId, payload);

      await refreshProducts();

      toast.success('Product updated successfully');

      setSelectedProduct(null);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update product.',
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleUpdateQuantity(productId: string, quantity: number) {
    try {
      setProcessing(true);

      await cartService.updateItem(productId, {
        quantity,
      });

      await Promise.all([refreshProducts(), refreshCart()]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update cart.',
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleRemoveItem(productId: string) {
    try {
      setProcessing(true);

      await cartService.removeItem(productId);

      await Promise.all([refreshProducts(), refreshCart()]);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to remove item.',
      );
    } finally {
      setProcessing(false);
    }
  }

  const cartItemCount = useMemo(() => {
    if (!cart) return 0;

    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  if (loading) {
    return (
      <>
        <Header title="Shopping Cart" cartItemCount={0} />

        <main className="mx-auto max-w-7xl px-6 py-8">
          <ProductGridSkeleton />
        </main>
      </>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!cart) {
    return null;
  }

  return (
    <>
      <AppToaster />

      <Header
        title="Shopping Cart"
        cartItemCount={cartItemCount}
        onCartClick={() => setCartOpen(true)}
      />

      <CartSheet
        open={cartOpen}
        cart={cart}
        onOpenChange={setCartOpen}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        processing={processing}
      />

      <EditProductDialog
        open={selectedProduct !== null}
        product={selectedProduct}
        loading={processing}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedProduct(null);
          }
        }}
        onSave={handleUpdateProduct}
      />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <ProductForm loading={processing} onSubmit={handleCreateProduct} />

        <section className="mb-8">
          <h2 className="text-3xl font-bold">Products</h2>

          <p className="mt-2 text-muted-foreground">
            Browse available products and add them to your cart.
          </p>
        </section>

        <ProductGrid
          products={products}
          loading={processing}
          onAddToCart={(productId) => {
            const product = products.find((p) => p.id === productId);

            if (product) {
              handleAddToCart(product);
            }
          }}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </main>
    </>
  );
}

export default ShoppingCart;
