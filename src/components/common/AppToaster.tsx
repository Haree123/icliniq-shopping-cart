import { Toaster } from 'sonner';

/**
 * Global toast notification provider.
 *
 * Configures application-wide toast messages with a top-right
 * placement, rich colors, close button support, and collapsed expansion.
 */
function AppToaster() {
  return <Toaster position="top-right" richColors closeButton expand={false} />;
}

export default AppToaster;
