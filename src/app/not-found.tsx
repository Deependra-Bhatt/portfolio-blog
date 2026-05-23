import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center selection:bg-orange-500">
      {/* ERROR CODE - Glitch Style */}
      <div className="relative mb-8">
        <h1 className="text-[12rem] md:text-[18rem] font-black uppercase tracking-tighter leading-none italic text-zinc-200 dark:text-zinc-800">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter bg-white dark:bg-zinc-950 border-4 border-black dark:border-white px-6 py-2 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
            Lost in <span className="text-orange-500">Logic</span>
          </h2>
        </div>
      </div>

      {/* MESSAGE */}
      <div className="max-w-md space-y-6 mb-12">
        <p className="text-xl md:text-2xl font-bold leading-tight">
          The cadence of this URL doesn't match any of my systems. It seems
          we've reached a{" "}
          <span className="underline decoration-indigo-500 decoration-4">
            dead end.
          </span>
        </p>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
          Error_Code: PATH_NOT_DEFINED // System_Status: Confused
        </p>
      </div>

      {/* CTA BUTTON */}
      <Link href="/" className="group relative">
        {/* Shadow Background */}
        <div className="absolute inset-0 bg-black dark:bg-white translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />

        <div className="relative bg-orange-500 text-white font-black uppercase tracking-tighter px-10 py-4 border-4 border-black dark:border-white text-xl transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
          Return to Reality →
        </div>
      </Link>
    </main>
  );
}
