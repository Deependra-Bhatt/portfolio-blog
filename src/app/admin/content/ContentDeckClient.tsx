// app/(admin)/admin/content/ContentDeckClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconSearch,
  IconTrash,
  IconAdjustments,
  IconExternalLink,
  IconEdit,
  IconPencil,
} from "@tabler/icons-react";

interface ClientBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: string;
  createdAt: string;
}

export default function ContentDeckClient({
  initialBlogs,
}: {
  initialBlogs: ClientBlog[];
}) {
  const [blogs, setBlogs] = useState<ClientBlog[]>(initialBlogs);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "draft" | "published" | "archived"
  >("all");

  // Handle instant status changes optimistically
  async function handleStatusChange(id: string, newStatus: string) {
    const originalBlogs = [...blogs];

    // Optimistic execution block
    setBlogs(blogs.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "STATUS", status: newStatus }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Revert if system network pipeline fails
      setBlogs(originalBlogs);
      alert("System sync error. Reverting state machine modification.");
    }
  }

  // Handle immediate soft delete
  async function handleDelete(id: string, title: string) {
    if (!confirm(`EXECUTE SYSTEM DELETION ON: "${title.toUpperCase()}"?`))
      return;

    const originalBlogs = [...blogs];
    setBlogs(blogs.filter((b) => b.id !== id));

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "DELETE" }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setBlogs(originalBlogs);
      alert("Deletion request rejected by core layer.");
    }
  }

  // Filter processing pipeline
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.slug.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || blog.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      {/* Search and Optimization Toolbelt */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-stretch">
        {/* Search Sub-component */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="FILTER SYSTEM LOGS VIA TITLE OR SLUG..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-4 border-black dark:border-white px-12 py-4 bg-white dark:bg-zinc-900 font-black uppercase placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-orange-500"
          />
          <IconSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black dark:text-white"
            stroke={3}
          />
        </div>

        {/* State Filters */}
        <div className="flex border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-1 gap-1">
          {(["all", "draft", "published", "archived"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors ${
                filter === type
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Create Action Module - Brutalist Style */}
        <Link
          href="/admin/create-blog"
          className="group relative block min-w-[140px]"
        >
          {/* Hard Offset Shadow */}
          <div className="absolute inset-0 bg-black dark:bg-white translate-x-1 translate-y-1" />

          {/* Interactive Top Layer */}
          <div className="relative h-full border-4 border-black dark:border-white bg-orange-500 text-black px-4 py-2 flex items-center justify-center gap-2 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0">
            <IconPencil stroke={3} size={18} />
            <span className="font-black uppercase text-xs tracking-wider">
              New Script
            </span>
          </div>
        </Link>
      </div>

      {/* Structured Modern Brutalist Data Inventory */}
      <div className="grid grid-cols-1 gap-6">
        {filteredBlogs.length === 0 ? (
          <div className="border-4 border-dashed border-black dark:border-white p-12 text-center font-black uppercase tracking-wide">
            No system instances matching parameters found.
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="relative group border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-black uppercase tracking-tight leading-none">
                    {blog.title}
                  </h3>
                  <select
                    value={blog.status}
                    onChange={(e) =>
                      handleStatusChange(blog.id, e.target.value)
                    }
                    className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black focus:outline-none tracking-widest cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      blog.status === "draft"
                        ? "bg-orange-400 text-black"
                        : blog.status === "archived"
                          ? "bg-zinc-400 text-black"
                          : "bg-emerald-400 text-black"
                    }`}
                  >
                    <option value="draft">DRAFT</option>
                    <option value="published">PUBLISHED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </div>
                <p className="text-xs font-mono text-zinc-400">
                  /{blog.slug} • Registered:{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400 line-clamp-1 max-w-2xl">
                  {blog.excerpt}
                </p>
              </div>

              {/* Functional Actions Layout Block */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t-2 md:border-t-0 pt-4 md:pt-0 border-zinc-100 dark:border-zinc-800">
                <Link
                  href={`/admin/create-blog?edit=${blog.slug}`}
                  className="flex items-center gap-1 border-2 border-black bg-white text-black px-3 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500 hover:text-white transition-all"
                >
                  <IconEdit size={14} stroke={3} /> Script
                </Link>
                <Link
                  href={`/blogs/${blog.slug}`}
                  target="_blank"
                  className="flex items-center gap-1 border-2 border-black bg-zinc-100 text-black px-3 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-indigo-600 hover:text-white transition-all"
                >
                  <IconExternalLink size={14} stroke={3} /> Scope
                </Link>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="flex items-center gap-1 border-2 border-black bg-red-500 text-white px-3 py-2 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all"
                >
                  <IconTrash size={14} stroke={3} /> Purge
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
