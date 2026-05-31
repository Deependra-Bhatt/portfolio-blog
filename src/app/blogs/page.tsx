// src/app/blogs/page.tsx
import Link from "next/link";
import { getPaginatedBlogs } from "@/lib/blogQueries";
import PaginationControls from "@/components/blog/PaginationControls";

interface BlogsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedParams = await searchParams;

  // Clean parsing of user parameter inputs with static defensive fallbacks
  const currentPage = Math.max(
    1,
    parseInt((resolvedParams.page as string) || "1", 10),
  );
  const limit = 6;

  // 1. Fetch data from your database layer
  const { blogs, total } = await getPaginatedBlogs(currentPage, limit);

  // 2. DEFENSIVE PARSING: Guarantee that total is processed as a pure base-10 number
  const cleanTotal =
    typeof total === "number" ? total : parseInt((total as any) || "0", 10);

  // 3. Compute total pages safely, ensuring a fallback minimum of 1 page
  const totalPages = Math.max(1, Math.ceil(cleanTotal / limit));
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 selection:bg-indigo-500 selection:text-white">
      {/* HEADER SECTION - Brutalist Style */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          The <br />
          <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 animate-gradient-x">
            Journal
          </span>
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
        {blogs.length === 0 ? (
          <div className="border-4 border-dashed border-black dark:border-white p-12 text-center font-black uppercase tracking-wide">
            End of stream index. No narratives registered here.
          </div>
        ) : (
          blogs.map((blog: any) => (
            <Link
              key={blog._id.toString()}
              href={`/blogs/${blog.slug}`}
              className="group relative block"
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

                {/* Tags */}
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
          ))
        )}
      </div>

      {/* NEW ISOLATED COMPONENT CALLOUT */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/blogs"
      />

      {/* FOOTER CALLOUT */}
      {currentPage === totalPages && (
        <div className="mt-24 p-8 border-4 border-dashed border-zinc-300 dark:border-zinc-700 text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            More insights arriving weekly.
          </p>
        </div>
      )}
    </main>
  );
}
