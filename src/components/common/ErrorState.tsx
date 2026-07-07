interface ErrorStateProps {
  message: string;
}

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
