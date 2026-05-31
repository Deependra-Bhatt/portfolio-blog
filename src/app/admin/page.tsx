// app/(admin)/admin/page.tsx
import { getDashboardStats } from "@/lib/dashboardService";
import Link from "next/link";
import {
  IconFileCode,
  IconEye,
  IconUsers,
  IconPlus,
  IconSettings,
} from "@tabler/icons-react";

export const revalidate = 0; // Ensure data is server-side evaluated on every entry load

export default async function AdminDashboardOverview() {
  const { stats, recentBlogs } = await getDashboardStats();

  return (
    <div className="space-y-12 p-6 max-w-[1400px] mx-auto selection:bg-indigo-600 selection:text-white">
      {/* Dynamic Brand Bar */}
      <header className="border-4 border-black dark:border-white bg-orange-500 p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter text-black">
              CORE COMMAND
            </h1>
            <p className="text-xs font-black uppercase tracking-widest text-black/80 mt-1">
              Human-Centric Engineering // Live Operations Platform
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/create-blog"
              className="border-4 border-black bg-white text-black font-black uppercase px-4 py-2 text-sm tracking-tight flex items-center gap-2 hover:-translate-x-1 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform"
            >
              <IconPlus stroke={3} size={16} /> New Script
            </Link>
          </div>
        </div>
      </header>

      {/* Grid of Aggregated Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Content Status */}
        <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Inventory
            </span>
            <IconFileCode className="text-indigo-600" stroke={2.5} size={28} />
          </div>
          <div className="text-6xl font-black uppercase tracking-tighter mb-2">
            {stats.totalBlogs}
          </div>
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
            Total Articles Recorded ({stats.draftsCount} active drafts)
          </p>
        </div>

        {/* Card 2: Cumulative Reads */}
        <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[6px_6px_0px_0px_rgba(236,72,153,1)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Impressions
            </span>
            <IconEye className="text-pink-500" stroke={2.5} size={28} />
          </div>
          <div className="text-6xl font-black uppercase tracking-tighter mb-2">
            {stats.totalViews}
          </div>
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
            Total Telemetry Raw Reads across components
          </p>
        </div>

        {/* Card 3: Network Cohort */}
        <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)]">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Audience
            </span>
            <IconUsers className="text-orange-500" stroke={2.5} size={28} />
          </div>
          <div className="text-6xl font-black uppercase tracking-tighter mb-2">
            {stats.uniqueVisitors}
          </div>
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
            Unique Visitor Signatures evaluated via pipeline
          </p>
        </div>
      </section>

      {/* Modern Brutalist Data Stream Table */}
      <section className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)]">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
          <IconSettings stroke={2.5} /> Active Stream Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-black dark:border-white bg-zinc-100 dark:bg-zinc-800">
                <th className="p-4 text-xs font-black uppercase tracking-widest">
                  Document Title
                </th>
                <th className="p-4 text-xs font-black uppercase tracking-widest">
                  System Slug
                </th>
                <th className="p-4 text-xs font-black uppercase tracking-widest">
                  Status Engine
                </th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-zinc-200 dark:divide-zinc-800 font-bold">
              {recentBlogs.map((blog) => (
                <tr
                  key={blog._id?.toString()}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="p-4 truncate max-w-xs">{blog.title}</td>
                  <td className="p-4 text-sm font-mono text-zinc-500">
                    /{blog.slug}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                        blog.status === "draft"
                          ? "bg-orange-400 text-black"
                          : blog.status === "archived"
                            ? "bg-zinc-400 text-black"
                            : "bg-emerald-400 text-black"
                      }`}
                    >
                      {blog.status || "published"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/create-blog?edit=${blog.slug}`}
                      className="text-xs font-black uppercase border-2 border-black bg-white text-black dark:bg-white dark:text-black px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500 hover:text-white transition-colors"
                    >
                      Configure
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
