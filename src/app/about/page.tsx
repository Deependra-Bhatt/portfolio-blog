export default function AboutPage() {
  const skills = [
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "MongoDB",
    "HTML",
    "CSS",
  ];

  const focusItems = [
    "Building a full-stack portfolio & blog platform",
    "Mastering Data Structures & Algorithms",
    "Learning system design fundamentals",
    "Exploring AI tools and prompt engineering",
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 selection:bg-orange-500 selection:text-white">
      {/* HEADER SECTION - The "Train of Thought" Bold Intro */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          About <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 animate-gradient-x">
            Me
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-400 max-w-xl leading-snug">
          A developer focused on{" "}
          <span className="text-black dark:text-white underline decoration-orange-500 decoration-4">
            building scalable systems
          </span>
          , solving real-world problems, and continuous evolution.
        </p>
      </section>

      {/* BODY CONTENT - Minimalist Typography */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Bio */}
        <div className="md:col-span-8 space-y-8">
          <div className="group">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-orange-500 mb-4">
              The Story
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed text-zinc-800 dark:text-zinc-200">
              <p>
                Hi, I’m{" "}
                <span className="font-extrabold text-black dark:text-white">
                  Deependra Bhatt
                </span>
                . I’m a full-stack developer with a strong foundation in data
                structures and problem solving.
              </p>
              <p>
                I enjoy{" "}
                <span className="italic">building systems from scratch</span>,
                understanding how things work under the hood, and writing clean,
                maintainable code.
              </p>
              <p className="border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-50/50 dark:bg-indigo-900/10">
                Currently, I’m focused on mastering core computer science
                concepts and building products that reflect my learning journey.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Focus */}
        <div className="md:col-span-4 space-y-12">
          {/* Skills Section */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-indigo-500 mb-6">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm font-bold border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Focus Section */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-pink-500 mb-4">
              Current Focus
            </h2>
            <ul className="space-y-4">
              {focusItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm font-semibold group"
                >
                  <span className="text-orange-500 group-hover:scale-125 transition-transform">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
