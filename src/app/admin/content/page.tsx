// app/(admin)/admin/content/page.tsx
import { getAdminBlogs } from "@/lib/blogQueries";
import ContentDeckClient from "./ContentDeckClient";

export const revalidate = 0; // Guard against static building parameters

export default async function AdminContentDeck() {
  // Fetch initial system logs from the server layer
  const rawBlogs = await getAdminBlogs();

  // Transform MongoDB internal documents cleanly for client dehydration
  const initialBlogs = rawBlogs.map((blog) => ({
    id: blog._id?.toString() || "",
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    status: blog.status || "published",
    createdAt: blog.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 max-w-[1400px] mx-auto selection:bg-pink-500 selection:text-white">
      <header className="mb-12 border-b-8 border-black pb-4">
        <h1 className="text-6xl font-black uppercase tracking-tighter">
          MANAGE <span className="text-orange-500">CADENCE</span>
        </h1>
        <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mt-2">
          System Control: Write, Mutate, and Archive Content Layers
        </p>
      </header>

      <ContentDeckClient initialBlogs={initialBlogs} />
    </div>
  );
}
