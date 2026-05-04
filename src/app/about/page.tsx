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
    <main className="max-w-5xl mx-auto px-6 py-16 selection:bg-orange-500 selection:text-white">
      {/* HEADER SECTION - The "Dual Identity" Intro */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          Code & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 animate-gradient-x">
            Cadence
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-bold text-zinc-600 dark:text-zinc-400 max-w-2xl leading-snug">
          I am a developer who believes that{" "}
          <span className="text-black dark:text-white underline decoration-orange-500 decoration-4">
            scalable systems
          </span>{" "}
          and{" "}
          <span className="text-black dark:text-white underline decoration-indigo-500 decoration-4">
            soulful stories
          </span>{" "}
          are built on the same foundation:{" "}
          <span className="italic">structure and empathy.</span>
        </p>
      </section>

      {/* BODY CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: The Narrative */}
        <div className="md:col-span-8 space-y-12">
          {/* Section 1: The Dev */}
          <div className="group">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-orange-500 mb-4">
              01. The Engineer
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed font-medium text-zinc-800 dark:text-zinc-200">
              <p>
                Hi, I’m{" "}
                <span className="font-extrabold text-black dark:text-white">
                  Deependra Bhatt
                </span>
                . I approach full-stack development as a craft of precision.
                From architecting robust backends in{" "}
                <span className="text-indigo-500">Java & Python</span> to
                crafting seamless frontends with{" "}
                <span className="text-orange-500">Next.js</span>, I thrive on
                solving complex problems under the hood.
              </p>
              <p className="border-l-4 border-black dark:border-white pl-6 py-2 bg-zinc-100 dark:bg-zinc-900/50">
                Currently, I am deep-diving into{" "}
                <span className="italic">System Design</span> and advanced{" "}
                <span className="italic">DSA</span>, preparing to build the next
                generation of production-level applications.
              </p>
            </div>
          </div>

          {/* Section 2: The Passion/Philosophy */}
          <div className="group">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-indigo-500 mb-4">
              02. The Expressionist
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed font-medium text-zinc-800 dark:text-zinc-200">
              <p>
                Beyond the terminal, I am a student of human expression. Whether
                it’s through the rhythm of{" "}
                <span className="font-bold">Poetry and Shayari</span> or the
                strategic flow of{" "}
                <span className="font-bold">Public Speaking</span>, I explore
                how communication can influence and connect.
              </p>
              <p>
                Recognized as the{" "}
                <span className="text-pink-500">
                  Best Anchor @ SRMCEM (2022)
                </span>
                , I apply the same clarity required for an event to my code
                documentation and team collaboration. To me,{" "}
                <span className="underline decoration-indigo-500 decoration-2">
                  logic is the skeleton, but literature is the heartbeat
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Focus */}
        <div className="md:col-span-4 space-y-12">
          {/* Expertise Section */}
          <div className="bg-white dark:bg-zinc-950 p-6 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-indigo-500 mb-6">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-black border-2 border-black dark:border-white hover:bg-orange-500 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Current Focus Section */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 border-4 border-dashed border-black dark:border-white">
            <h2 className="text-xs uppercase tracking-[0.3em] font-black text-pink-500 mb-4">
              Current Focus
            </h2>
            <ul className="space-y-4">
              {focusItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm font-bold group"
                >
                  <span className="text-orange-500 group-hover:rotate-45 transition-transform">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Philosophy Mini-Card */}
          <div className="p-6 bg-indigo-600 text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-widest leading-tight">
              "Code is how I solve problems. Writing is how I understand them."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
