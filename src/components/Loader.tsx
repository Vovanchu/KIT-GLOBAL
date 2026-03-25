export default function Loader() {
  return (
    <div className="flex items-center justify-center h-full w-full py-20">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-muted border-t-primary animate-spin"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
