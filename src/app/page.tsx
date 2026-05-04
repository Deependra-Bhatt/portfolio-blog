import Link from "next/link";
import { projects } from "@/data/projects";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-24 selection:bg-indigo-500 selection:text-white">
      {/* HERO SECTION - High Impact */}
      <section className="border-b-4 border-black dark:border-white pb-12">
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
          Deependra <br />
          <span className="text-orange-500 italic">Bhatt</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 items-end">
          <p className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
            Full-stack developer & problem solver building systems that matter.
            Exploring the intersection of{" "}
            <span className="underline decoration-indigo-500 decoration-4">
              logic and human expression.
            </span>
          </p>
          <p className="text-sm md:text-base font-medium text-zinc-500 uppercase tracking-widest">
            Based in India — Available for remote collaboration
          </p>
        </div>
      </section>

      {/* WHAT I DO & EXPRESSION - Two Column Layout */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-pink-500">
            The Mission
          </h2>
          <p className="text-lg font-bold leading-relaxed">
            I design and build full-stack applications with a focus on
            scalability and clarity. Beyond the IDE, I explore psychology and
            communication to build better products for people.
          </p>
        </div>
        <div className="bg-zinc-100 dark:bg-zinc-900 p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">
            Writing & Art
          </h2>
          <p className="text-sm font-bold mb-4">
            Best Anchor Award @ SRMCEM (2022). I express thoughts through
            poetry, shayari, and storytelling.
          </p>
          <Link
            href="/about"
            className="text-xs font-black uppercase underline decoration-2 hover:text-orange-500 transition-colors"
          >
            Read the story →
          </Link>
        </div>
      </section>

      {/* FEATURED PROJECTS - Brutalist Grid */}
      <section>
        <div className="flex justify-between items-end mb-12 border-b-4 border-black dark:border-white pb-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="group flex items-center gap-1 font-black uppercase text-xs mb-1 hover:text-orange-500 transition-colors"
          >
            View All
            <span className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-200">
              <IconArrowUpRight size={18} stroke={3} />
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.slice(0, 2).map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative"
            >
              <div className="absolute inset-0 bg-black dark:bg-white translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
              <div className="relative bg-white dark:bg-zinc-950 border-4 border-black dark:border-white p-6 h-full transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                <h3 className="text-xl font-black uppercase mb-2 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-black border-2 border-black dark:border-white px-2 py-0.5 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BLOGS PREVIEW - Simple but Bold */}
      <section className="grid md:grid-cols-12 gap-8 items-center border-y-4 border-black dark:border-white py-12">
        <div className="md:col-span-8">
          <h2 className="text-3xl font-black uppercase mb-4 italic">
            Thoughts & Observations
          </h2>
          <p className="text-lg font-bold text-zinc-600 dark:text-zinc-400">
            Writing about development, life, psychology, and the lessons learned
            while navigating the life.
          </p>
        </div>
        <div className="md:col-span-4 flex md:justify-end">
          <Link
            href="/blogs"
            className="px-8 py-4 bg-indigo-600 text-white font-black uppercase tracking-tighter border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Explore Blogs
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
          Have an <span className="text-orange-500">Idea?</span>
        </h2>
        <Link
          href="/contact"
          className="inline-block px-10 py-5 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xl border-4 border-black dark:border-white shadow-[10px_10px_0px_0px_rgba(249,115,22,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all"
        >
          Let's Connect
        </Link>
      </section>
    </main>
  );
}
