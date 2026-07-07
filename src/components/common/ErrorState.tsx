/**
 * Props required by the ErrorState component.
 */
interface ErrorStateProps {
  message: string;
}

/**
 * Displays an error state message when an operation fails.
 *
 * Shows a user-friendly error heading along with the provided
 * error details.
 *
 * @param props Error state configuration.
 */
function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="flex h-[400px] items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong
        </h2>

        <p className="mt-2 text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default ErrorState;
