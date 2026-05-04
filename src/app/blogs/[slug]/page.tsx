import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetail({ params }: PageProps) {
  // Await params to fix the Next.js async logic error
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 selection:bg-pink-500 selection:text-white">
      {/* Back Navigation */}
      <Link
        href="/blogs"
        className="inline-block mb-12 text-xs font-black uppercase tracking-widest border-b-2 border-black dark:border-white hover:text-orange-500 hover:border-orange-500 transition-all"
      >
        ← Back to Journal
      </Link>

      <article className="space-y-12">
        {/* Header Section */}
        <header className="border-b-4 border-black dark:border-white pb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-black uppercase tracking-[0.2em] px-3 py-1 bg-indigo-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Essay
            </span>
            <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
              {blog.date} — {blog.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            {blog.title}
          </h1>

          <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-400 italic leading-snug max-w-2xl">
            {blog.description}
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-8 text-lg md:text-xl leading-relaxed font-medium text-zinc-800 dark:text-zinc-200">
          <p>
            This space is where{" "}
            <span className="text-black dark:text-white font-extrabold underline decoration-orange-500 decoration-4">
              logic meets literature
            </span>
            . The full engine is currently under construction.
          </p>

          <div className="bg-zinc-100 dark:bg-zinc-900 p-8 border-4 border-black dark:border-white relative overflow-hidden">
            {/* Decorative element to match your "Story" sections */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/20 translate-x-8 -translate-y-8 rotate-45" />

            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-indigo-500 mb-4">
              Roadmap Update
            </h2>
            <p className="font-bold italic">
              Next week, I am integrating a Markdown-based CMS, real-time
              analytics, and a hidden admin dashboard for seamless creation.
              This platform will transform into a living archive of my
              engineering journey and psychological explorations.
            </p>
          </div>

          <p>
            For now, consider this a structural preview. Every headline, every
            paragraph, and every line of code is being refined to ensure that
            the <span className="italic">cadence</span> of the writing matches
            the <span className="italic">efficiency</span> of the code.
          </p>
        </div>

        {/* Footer of Article */}
        <footer className="pt-10 border-t-4 border-black dark:border-white flex justify-between items-center">
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-orange-500 border-2 border-black" />
            <div>
              <p className="text-xs font-black uppercase tracking-widest">
                Written By
              </p>
              <p className="text-sm font-bold">Deependra Bhatt</p>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
