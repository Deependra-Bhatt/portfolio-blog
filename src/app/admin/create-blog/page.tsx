"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import {
  IconSend,
  IconEye,
  IconRefresh,
  IconDeviceFloppy,
} from "@tabler/icons-react";

function EditorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit"); // Captures the ?edit=slug string

  // Unified Workspace Input States
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "archived">(
    "draft",
  );

  // Operational Control Flags
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Phase 4 Hydration: Sync existing content into form fields if in Edit Mode
  useEffect(() => {
    if (!editSlug) return;

    async function fetchTargetBlog() {
      setFetching(true);
      setMessage("");
      try {
        const response = await fetch(`/api/blogs/${editSlug}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          setMessage(data.message || "FAILED TO ACQUIRE DOCUMENT INSTANCE.");
          return;
        }

        // Handle structural document mappings safely
        const blog = data.data;
        if (blog) {
          setTitle(blog.title || "");
          setExcerpt(blog.excerpt || "");
          setContent(blog.content || "");
          setTags(Array.isArray(blog.tags) ? blog.tags.join(", ") : "");
          setStatus(blog.status || "published");
        }
      } catch (error) {
        console.error("Hydration Error:", error);
        setMessage("SYSTEM EXCEPTION: BUFFER SYNC BREAKDOWN.");
      } finally {
        setFetching(false);
      }
    }

    fetchTargetBlog();
  }, [editSlug]);

  // Unified Form Actions Submitter (POST vs PUT)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      title,
      excerpt,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
    };

    try {
      // Branch endpoints and network methods systematically based on state parameters
      const endpoint = editSlug ? `/api/blogs/${editSlug}` : "/api/blogs";
      const method = editSlug ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "TRANSMISSION REFUSED BY SERVER TARGET.");
        return;
      }

      setLastSaved(new Date().toLocaleTimeString());
      setMessage(
        editSlug
          ? "CHANGES SYNCED TO PRODUCTION CONTEXT."
          : "STORY ARCHIVED SUCCESSFULLY.",
      );

      // If we just built a brand new document, redirect straight to its newly minted public scope
      if (!editSlug) {
        router.push(`/blogs/${data.data?.slug}`);
      }
    } catch (error) {
      console.error("Transmission Error:", error);
      setMessage("SYSTEM ERROR: PIPELINE NETWORK TIMEOUT.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyles =
    "w-full border-4 border-black dark:border-white px-4 py-3 bg-white dark:bg-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-pink-500 transition-all";

  // Enforce clean, zero-jitter layout state management while loading initial data
  if (fetching) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center font-black uppercase tracking-tighter italic animate-pulse">
        <IconRefresh
          className="animate-spin text-indigo-600 mb-4"
          size={48}
          stroke={3}
        />
        Hydrating Content Buffers...
      </div>
    );
  }

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-16">
      <header className="mb-12 border-b-8 border-black pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-6xl font-black uppercase tracking-tighter">
            {editSlug ? "Mutating" : "Drafting"}{" "}
            <span className="text-orange-500">Cadence</span>
          </h1>
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mt-2">
            {editSlug
              ? `SYSTEM TARGET: /${editSlug}`
              : "CORE REPOSITORY WORKSPACE // WRITING SCRIPT"}
          </p>
        </div>

        {lastSaved && (
          <div className="border-2 border-black bg-zinc-100 dark:bg-zinc-800 p-2 text-xs font-mono font-black flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black dark:text-white">
            <IconDeviceFloppy size={14} /> SYSTEM MEMORY SYNCED // {lastSaved}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT COMPONENT: UNIFIED MUTATOR EDITOR */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              Headline String
            </label>
            <input
              type="text"
              placeholder="THE LOGIC OF STORYTELLING"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputStyles}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest">
                Tags (Comma Block)
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
                Status Lifecycle State
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className={`${inputStyles} cursor-pointer`}
              >
                <option value="draft">DRAFT (HIDDEN WORKSPACE)</option>
                <option value="published">PUBLISHED (PUBLIC CONTEXT)</option>
                <option value="archived">ARCHIVED (HISTORICAL STANDING)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              The Hook (System Excerpt)
            </label>
            <textarea
              placeholder="Briefly bridge the gap..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest">
              Markdown Script Editor
            </label>
            <textarea
              placeholder="# Start the narrative execution loop..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              className={`${inputStyles} font-mono text-sm leading-relaxed`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full"
          >
            <div className="absolute inset-0 bg-black translate-x-2 translate-y-2" />
            <div className="relative flex items-center justify-center gap-3 border-4 border-black bg-pink-500 py-4 font-black uppercase tracking-widest text-white group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform disabled:opacity-50">
              <IconSend stroke={3} size={18} />
              {loading
                ? "TRANSMITTING PLUGINS..."
                : editSlug
                  ? "SYNC CHANGES TO MAIN"
                  : "PUBLISH TO JOURNAL"}
            </div>
          </button>

          {message && (
            <p className="font-black uppercase text-sm border-2 border-black p-2 bg-orange-100 text-black inline-block">
              {message}
            </p>
          )}
        </form>

        {/* RIGHT COMPONENT: REAL-TIME PARSER PREVIEW */}
        <div className="hidden lg:block sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
            <IconEye stroke={3} />
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              Visual Feedback
            </h2>
          </div>

          <div className="border-4 border-black dark:border-white p-8 bg-zinc-50 dark:bg-zinc-800 shadow-[8px_8px_0px_0px_rgba(79,70,229,1)] min-h-full">
            <article
              className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter 
              prose-blockquote:border-l-8 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 dark:prose-blockquote:bg-zinc-900 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:font-bold"
            >
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

// Global Compilation Root wrapped within a Suspense Boundary block to respect Next.js static output builds
export default function CreateBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-tighter animate-pulse">
          Initializing System Engine Workspace...
        </div>
      }
    >
      <EditorForm />
    </Suspense>
  );
}
