import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogQueries";
import Link from "next/link";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const awaitedParams = await params;
  const blog = await getBlogBySlug(awaitedParams.slug);
  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} | Code & Cadence`,
    description: blog.excerpt,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(blog.slug, blog.tags);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 selection:bg-pink-500 selection:text-white">
      {/* Back Link - Tactile Interaction */}
      <Link
        href="/blogs"
        className="inline-flex items-center gap-2 mb-12 text-xs font-black uppercase tracking-[0.2em] group transition-colors hover:text-orange-500"
      >
        <span className="group-hover:-translate-x-2 transition-transform duration-200">
          ←
        </span>
        Back to Journal
      </Link>

      <article className="space-y-12">
        {/* Header Section */}
        <header className="border-b-8 border-black dark:border-white pb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap gap-3">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-black uppercase px-3 py-1 border-2 border-black dark:border-white bg-orange-500 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              [ Published:{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              ]
            </p>
          </div>

          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
            {blog.title}
          </h1>

          <div className="p-6 border-4 border-black bg-indigo-600 text-white shadow-[8px_8px_0px_0px_rgba(236,72,153,1)]">
            <p className="italic text-xl md:text-2xl font-bold leading-tight">
              "{blog.excerpt}"
            </p>
          </div>
        </header>

        {/* Content Section - Brutalist Prose */}
        <section
          className="
            prose prose-lg dark:prose-invert max-w-none
            prose-headings:text-black dark:prose-headings:text-white
            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter
            prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl
            prose-p:text-zinc-800 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
            prose-strong:text-black dark:prose-strong:text-white prose-strong:font-black
            prose-a:text-orange-500 prose-a:no-underline prose-a:border-b-4 prose-a:border-orange-500
            prose-blockquote:border-l-8 prose-blockquote:border-pink-500 prose-blockquote:bg-zinc-100 dark:prose-blockquote:bg-zinc-900 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:font-bold prose-blockquote:italic
            prose-img:border-4 prose-img:border-black prose-img:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          "
        >
          <MarkdownRenderer content={blog.content} />
        </section>

        {/* Footer / Author Block */}
        <footer className="mt-20 pt-10 border-t-8 border-black dark:border-white grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500">
              The Architect
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-500 border-4 border-black dark:border-zinc-500 flex items-center justify-center text-black font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                DB
              </div>
              <div>
                <p className="font-black text-lg uppercase tracking-tight leading-none">
                  Deependra Bhatt
                </p>
                <p className="text-xs font-bold text-zinc-500 uppercase mt-1">
                  Full-Stack Engineer & Expressionist
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]">
            <p className="text-xs font-black uppercase tracking-widest mb-2 italic text-indigo-600">
              Logical Literature
            </p>
            <p className="text-sm font-bold leading-tight">
              "Logic is the skeleton, literature is the heartbeat." This post
              explores the friction between engineering and storytelling.
            </p>
          </div>
        </footer>
      </article>

      {/* Related Posts - Conditional Check */}
      {relatedBlogs && relatedBlogs.length > 0 && (
        <section className="mt-32">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-10 inline-block border-b-4 border-pink-500">
            Parallel Systems <span className="text-zinc-400">(Related)</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {relatedBlogs.map((relatedBlog) => (
              <Link
                key={relatedBlog._id?.toString()}
                href={`/blogs/${relatedBlog.slug}`}
                className="group relative"
              >
                <div className="absolute inset-0 bg-black dark:bg-white translate-x-2 translate-y-2" />
                <div className="relative border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1">
                  <h3 className="text-xl font-black uppercase tracking-tight mb-3 group-hover:text-orange-500 transition-colors">
                    {relatedBlog.title}
                  </h3>
                  <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {relatedBlog.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
