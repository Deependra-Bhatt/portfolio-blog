"use client";

import { useState } from "react";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { useRouter } from "next/navigation";
import { IconSend, IconEye } from "@tabler/icons-react";

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          tags: tags.split(",").map((tag) => tag.trim()),
        }),
      });

      const data = await response.json();
      if (!data.success) {
        setMessage(data.message);
        return;
      }
      setMessage("STORY ARCHIVED SUCCESSFULLY.");
      router.push(`/blogs/${data.data.slug}`);
    } catch (error) {
      setMessage("SYSTEM ERROR: UNABLE TO PUBLISH.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles =
    "w-full border-4 border-black dark:border-white px-4 py-3 bg-white dark:bg-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-pink-500 transition-all";

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-16">
      <h1 className="text-6xl font-black uppercase tracking-tighter mb-12 border-b-8 border-black pb-4">
        Drafting <span className="text-orange-500">Cadence</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: EDITOR */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              Headline
            </label>
            <input
              type="text"
              placeholder="THE LOGIC OF STORYTELLING"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputStyles}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              The Hook (Excerpt)
            </label>
            <textarea
              placeholder="Briefly bridge the gap..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className={inputStyles}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              Tags (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="engineering, poetry, web3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={inputStyles}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              Markdown Script
            </label>
            <textarea
              placeholder="# Start the narrative..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              className={`${inputStyles} font-mono text-sm`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full"
          >
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
            <div className="relative flex items-center justify-center gap-3 border-4 border-black bg-pink-500 py-4 font-black uppercase tracking-widest text-white group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform disabled:opacity-50">
              <IconSend stroke={3} />
              {loading ? "TRANSMITTING..." : "PUBLISH TO JOURNAL"}
            </div>
          </button>

          {message && (
            <p className="font-black uppercase text-sm border-2 border-black p-2 bg-orange-100 text-black inline-block">
              {message}
            </p>
          )}
        </form>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="hidden lg:block sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 text-indigo-600">
            <IconEye stroke={3} />
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              Visual Feedback
            </h2>
          </div>

          <div className="border-4 border-black dark:border-white p-8 bg-zinc-50 dark:bg-zinc-800 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)] min-h-full">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-blockquote:border-l-8 prose-blockquote:border-orange-500">
              <MarkdownRenderer
                content={content || "*Content preview will appear here...*"}
              />
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
