import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="mt-10 border-t-4 border-black dark:border-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo/Name Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              Deependra <span className="text-orange-500">Bhatt</span>
            </h2>
            <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} — BUILT WITH PASSION
            </p>
          </div>

          {/* Social Links with Icons */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-bold uppercase text-sm tracking-widest">
            <a
              href="https://github.com/Deependra-Bhatt"
              target="_blank"
              className="group flex items-center gap-2 hover:text-orange-500 transition-all duration-300"
            >
              <IconBrandGithub
                size={20}
                className="group-hover:scale-110 group-hover:-rotate-12 transition-transform"
              />
              <span>Github</span>
            </a>

            <a
              href="https://www.linkedin.com/in/deependra-bhatt-a4a03329a/"
              target="_blank"
              className="group flex items-center gap-2 hover:text-blue-500 transition-all duration-300"
            >
              <IconBrandLinkedin
                size={20}
                className="group-hover:scale-110 group-hover:rotate-12 transition-transform"
              />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:bhattdeependra01@gmail.com"
              className="group flex items-center gap-2 hover:text-pink-500 transition-all duration-300"
            >
              <IconMail
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
