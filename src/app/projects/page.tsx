import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Selected <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 animate-gradient-x">
            Works
          </span>
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group relative"
          >
            {/* The Offset Shadow Background */}
            <div className="absolute inset-0 bg-indigo-600 translate-x-3 translate-y-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />

            <div className="relative bg-white dark:bg-zinc-950 border-4 border-black dark:border-white p-8 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-black uppercase leading-tight group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h2>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-6 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-black uppercase px-2 py-1 border-2 border-black dark:border-white bg-zinc-100 dark:bg-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-[10px] font-black uppercase px-2 py-1">
                    + {project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
