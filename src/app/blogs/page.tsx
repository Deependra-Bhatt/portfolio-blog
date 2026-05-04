import Link from "next/link";
import { blogs } from "@/data/blogs";

export default function BlogsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 selection:bg-indigo-500 selection:text-white">
      {/* HEADER SECTION - Brutalist Style */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          The <br />
          <span className="text-orange-500 italic">Journal</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-400 max-w-2xl leading-snug">
          Raw thoughts on{" "}
          <span className="text-black dark:text-white underline decoration-indigo-500 decoration-4">
            engineering systems
          </span>
          , human psychology, and the art of{" "}
          <span className="text-black dark:text-white underline decoration-pink-500 decoration-4">
            narrative
          </span>
          .
        </p>
      </section>

      {/* BLOG LIST - High Contrast Cards */}
      <div className="grid grid-cols-1 gap-10">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group relative"
          >
            {/* Offset Shadow Background */}
            <div className="absolute inset-0 bg-black dark:bg-white translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />

            <article className="relative bg-white dark:bg-zinc-950 border-4 border-black dark:border-white p-8 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 border-2 border-black">
                    New Post
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
                    {blog.date}
                  </span>
                </div>
                <span className="text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                  {blog.readTime}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-indigo-600 transition-colors">
                {blog.title}
              </h2>

              <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-8 line-clamp-2">
                {blog.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-black uppercase group-hover:gap-4 transition-all">
                Read Article <span className="text-xl">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* FUTURE PLACEHOLDER - Analytics & Engagement */}
      <div className="mt-20 p-8 border-4 border-black dark:border-white bg-indigo-50/50 dark:bg-indigo-900/10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em]">
          Next Week: Real-time Analytics & Interactive Reading Experience
        </p>
      </div>
    </main>
  );
}
