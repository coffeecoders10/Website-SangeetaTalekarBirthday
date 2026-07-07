export default function WishesLoading() {
  return (
    <main className="relative flex-1">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <div className="mx-auto mb-12 h-10 w-2/3 max-w-md animate-pulse rounded-full bg-white/5" />
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="mb-6 h-64 animate-pulse break-inside-avoid rounded-3xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
