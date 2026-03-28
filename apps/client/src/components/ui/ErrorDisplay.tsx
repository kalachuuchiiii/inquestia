export const ErrorDisplay = ({ err }: { err: Error | null }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      Error has occured.
      <p>{err?.message || 'Internal Server Error'}</p>
    </div>
  );
};
