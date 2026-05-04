import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

// Use an interface for clarity
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  // Await the params to avoid logical errors in Next.js 15+
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 selection:bg-orange-500 selection:text-white">
      {/* HEADER SECTION - Brutalist Style */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
          {project.title.split("—")[0]} <br />
          <span className="text-orange-500 italic">Project</span>
        </h1>
        <p className="text-xl font-medium text-zinc-600 dark:text-zinc-400 max-w-2xl">
          {project.description}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-12">
          {/* Problem & Solution */}
          <div className="space-y-6">
            <div className="border-l-4 border-orange-500 pl-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-orange-500 mb-2">
                The Problem
              </h2>
              <p className="text-lg text-zinc-800 dark:text-zinc-200">
                {project.details.problem}
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-6">
              <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-indigo-500 mb-2">
                The Solution
              </h2>
              <p className="text-lg text-zinc-800 dark:text-zinc-200">
                {project.details.solution}
              </p>
            </div>
          </div>

          {/* Features & Learnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-black uppercase text-sm mb-4">
                Key Features
              </h3>
              <ul className="space-y-2">
                {project.details.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm font-bold flex items-start gap-2"
                  >
                    <span className="text-orange-500">→</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-black uppercase text-sm mb-4">Learnings</h3>
              <ul className="space-y-2">
                {project.details.learnings.map((l) => (
                  <li
                    key={l}
                    className="text-sm font-bold flex items-start gap-2"
                  >
                    <span className="text-pink-500">✦</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-8">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <h2 className="text-xs font-black uppercase mb-4 tracking-widest">
              Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-white dark:bg-black border-2 border-black dark:border-white px-2 py-1 text-[10px] font-black uppercase"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  className="block text-center py-3 bg-orange-500 text-white font-black uppercase tracking-tighter border-2 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  className="block text-center py-3 bg-white dark:bg-zinc-800 text-black dark:text-white font-black uppercase tracking-tighter border-2 border-black dark:border-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                >
                  Source Code
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
