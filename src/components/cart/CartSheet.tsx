import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

import type { Cart } from '@/types/cart';
import { formatCurrency } from '../../lib/format';

interface CartSheetProps {
  open: boolean;
  cart: Cart;
  onOpenChange: (open: boolean) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  processing: boolean;
}

function CartSheet({
  open,
  cart,
  onOpenChange,
  onUpdateQuantity,
  onRemoveItem,
  processing,
}: CartSheetProps) {
  const totalAmount = cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-[420px] flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>

          <SheetDescription>
            Review and manage your cart items.
          </SheetDescription>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <ShoppingCart className="h-14 w-14 text-muted-foreground" />

            <div className="space-y-2 text-center">
              <h3 className="font-semibold">Your cart is empty</h3>

              <p className="text-sm text-muted-foreground">
                Add products to begin shopping.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto py-4">
              {cart.items.map((item) => (
                <div key={item.productId} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{item.productName}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </div>

                    <Badge>
                      ₹{(item.unitPrice * item.quantity).toLocaleString()}
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          onUpdateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={processing || item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="outline"
                        disabled={processing}
                        onClick={() =>
                          onUpdateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        if (window.confirm('Remove this item from the cart?')) {
                          onRemoveItem(item.productId);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>

                <span>₹{totalAmount.toLocaleString()}</span>
              </div>

              <Button className="w-full">Checkout</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default CartSheet;
