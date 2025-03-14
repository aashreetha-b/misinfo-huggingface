export function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-muted"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-primary animate-spin"></div>
      </div>
    </div>
  )
}

