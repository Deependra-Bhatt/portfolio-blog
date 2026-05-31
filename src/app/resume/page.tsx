const ResumePage = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 selection:bg-orange-500 selection:text-white">
      {/* HEADER SECTION - Brutalist Style */}
      <section className="border-b-4 border-black dark:border-white pb-10 mb-12">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          Curriculum <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 animate-gradient-x">
            Vitae
          </span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xl md:text-2xl font-medium text-zinc-600 dark:text-zinc-400 max-w-md leading-snug">
            A documented history of{" "}
            <span className="text-black dark:text-white underline decoration-indigo-500 decoration-4">
              building
            </span>{" "}
            and{" "}
            <span className="text-black dark:text-white underline decoration-pink-500 decoration-4">
              learning
            </span>
            .
          </p>

          {/* Download Button with Neo-Brutalist Shadow */}
          <a
            href="/Resume.pdf"
            download
            className="group relative inline-block px-8 py-4 font-bold text-black dark:text-white border-2 border-orange-100 dark:border-gray-500 bg-black dark:bg-white transition-all hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            <span className="relative z-10">DOWNLOAD PDF</span>
            <div className="absolute inset-0 z-0 bg-orange-500 translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
          </a>
        </div>
      </section>

      {/* VIEWPORT SECTION */}
      <section className="space-y-8">
        <div className="group relative">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-orange-500 mb-6 flex items-center gap-2">
            <span className="animate-pulse">●</span> Live Preview
          </h2>
          {/* PDF Wrapper with Glassmorphism & Brutalist Border */}
          <div className="relative z-10 w-full h-[80vh] border-4 border-black dark:border-white rounded-none bg-white dark:bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(79,70,229,1)] dark:shadow-[12px_12px_0px_0px_rgba(249,115,22,1)] overflow-hidden">
            <iframe
              src="/Resume.pdf#toolbar=0"
              className="w-full h-full grayscale-[50%] contrast-[110%] hover:grayscale-0 transition-all duration-500"
              title="Deependra Bhatt Resume"
            />
          </div>
        </div>

        {/* FOOTER CALLOUT */}
        <div className="mt-16 p-8 border-2 border-black dark:border-white bg-indigo-50 dark:bg-indigo-950/20">
          <p className="text-lg font-bold flex items-center gap-3">
            <span className="text-2xl text-pink-500">✦</span>
            Looking for a specific tech stack?
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              Check out my projects for deep dives into my work.
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ResumePage;
