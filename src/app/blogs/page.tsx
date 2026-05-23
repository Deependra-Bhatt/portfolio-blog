import Link from "next/link";
import { getAllBlogs } from "@/lib/blogQueries";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 selection:bg-indigo-500 selection:text-white">
      {/* HEADER SECTION - Brutalist Style */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          The <br />
          <span className="text-orange-500 italic">Journal</span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-400 max-w-2xl leading-snug">
          Thoughts on{" "}
          <span className="text-black dark:text-white underline decoration-indigo-500 decoration-4">
            engineering systems
          </span>
          , human expression, and lessons from the{" "}
          <span className="text-black dark:text-white underline decoration-pink-500 decoration-4">
            experiences till now
          </span>
          .
        </p>
      </section>

      {/* BLOG LIST - Neo-Brutalist Cards */}
      <div className="grid grid-cols-1 gap-12">
        {blogs.map((blog: any) => (
          <Link
            key={blog._id.toString()}
            href={`/blogs/${blog.slug}`}
            className="group relative"
          >
            {/* The Offset Shadow Background */}
            <div className="absolute inset-0 bg-black dark:bg-white translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />

            <article className="relative bg-white dark:bg-zinc-950 border-4 border-black dark:border-white p-8 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Live from DB
                  </span>
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-orange-500 transition-colors">
                {blog.title}
              </h2>

              <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400 mb-8 line-clamp-2 leading-relaxed">
                {blog.excerpt}
              </p>

              {/* Tags - Styled like your Expertise section */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase px-3 py-1 border-2 border-black dark:border-white bg-zinc-100 dark:bg-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-black uppercase group-hover:gap-4 transition-all">
                Read Article <span className="text-xl">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* FOOTER CALLOUT */}
      <div className="mt-24 p-8 border-4 border-dashed border-zinc-300 dark:border-zinc-700 text-center">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
          More insights arriving weekly.
        </p>
      </div>
    </main>
  );
}
