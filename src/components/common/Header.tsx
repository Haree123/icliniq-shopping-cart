import { ShoppingCart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title: string;
  cartItemCount: number;
  onCartClick?: () => void;
}

function Header({ title, cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

        <Button variant="outline" className="relative" onClick={onCartClick}>
          <ShoppingCart className="h-5 w-5" />

          {cartItemCount > 0 && (
            <Badge
              className="
                absolute
                -right-2
                -top-2
                flex
                h-6
                min-w-6
                items-center
                justify-center
                rounded-full
                px-1
              "
            >
              {cartItemCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}

export default Header;
