export default function AboutPage() {
  return (
    <section className="space-y-10">
      {/* Heading */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          About Me
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
          A developer focused on building scalable systems, solving real-world
          problems, and continuously improving.
        </p>
      </div>

      {/* Intro */}
      <div className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <p>
          Hi, I’m <span className="font-semibold">Deependra Bhatt</span>. I’m a
          full stack developer with a strong foundation in data structures and
          problem solving.
        </p>

        <p>
          I enjoy building systems from scratch, understanding how things work
          under the hood, and writing clean, maintainable code.
        </p>

        <p>
          Currently, I’m focused on mastering core computer science concepts,
          full-stack development, and building real-world products that reflect
          my learning.
        </p>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Skills</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "C++",
            "Java",
            "Python",
            "JavaScript",
            "TypeScript",
            "Next.js",
            "MongoDB",
            "HTML",
            "CSS",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full border border-zinc-300 dark:border-zinc-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Current Focus */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Focus</h2>

        <ul className="list-disc list-inside text-zinc-700 dark:text-zinc-300 space-y-2">
          <li>Building a full-stack portfolio & blog platform</li>
          <li>Mastering Data Structures & Algorithms</li>
          <li>Learning system design fundamentals</li>
          <li>Exploring AI tools and prompt engineering</li>
        </ul>
      </div>
    </section>
  );
}
