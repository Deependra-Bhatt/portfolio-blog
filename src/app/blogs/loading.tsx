export default function BlogsLoading() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Header Skeleton */}
      <div className="mb-12 border-b-4 border-black pb-4 animate-pulse">
        <div className="h-12 w-64 bg-zinc-300 dark:bg-zinc-700 border-2 border-black" />
        <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 mt-4" />
      </div>

      <div className="space-y-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative border-4 border-black bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] animate-pulse"
          >
            {/* Title Bar */}
            <div className="h-8 w-3/4 bg-orange-200 dark:bg-orange-900/30 border-2 border-black mb-6" />

            {/* Content Lines */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Metadata Tag */}
            <div className="mt-6 flex gap-4">
              <div className="h-6 w-20 bg-indigo-200 dark:bg-indigo-900/30 border-2 border-black" />
              <div className="h-6 w-24 bg-pink-200 dark:bg-pink-900/30 border-2 border-black" />
            </div>
          </div>
        ))}
      </div>

      {/* Narrative Loading Indicator */}
      <div className="mt-12 text-center font-black uppercase tracking-tighter italic animate-bounce">
        Stitching Stories...
      </div>
    </main>
  );
}
