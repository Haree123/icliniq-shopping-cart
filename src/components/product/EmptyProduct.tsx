import { PackageOpen } from 'lucide-react';

function EmptyProducts() {
  return (
    <div className="flex h-[350px] items-center justify-center rounded-lg border border-dashed">
      <div className="text-center">
        <PackageOpen className="mx-auto h-14 w-14 text-muted-foreground" />

        <h3 className="mt-4 text-xl font-semibold">No Products Available</h3>

        <p className="mt-2 text-muted-foreground">
          Products will appear here once they are added.
        </p>
      </div>
    </div>
  );
}

export default EmptyProducts;
