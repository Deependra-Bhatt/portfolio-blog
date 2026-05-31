import ContactForm from "../../components/ContactForm";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMapPin,
} from "@tabler/icons-react";

export default function ContactPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24 md:py-32">
      {/* Bold Header */}
      <div className="mb-20">
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] italic">
          Let's <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 animate-gradient-x">
            Connect
          </span>
        </h1>
        <p className="text-xl md:text-2xl mt-6 text-zinc-600 dark:text-zinc-400 font-bold max-w-xl leading-snug">
          Whether you're looking to{" "}
          <span className="text-black dark:text-white underline decoration-orange-500 decoration-4">
            engineer a complex system
          </span>{" "}
          or want to discuss the{" "}
          <span className="text-black dark:text-white underline decoration-indigo-500 decoration-4">
            art of storytelling
          </span>{" "}
          — I'm just a message away.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
        {/* LEFT: Vibrant Info */}
        <div className="space-y-16">
          {/* Location */}
          <div className="group cursor-default">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">
              Location
            </h2>
            <div className="flex items-center gap-3">
              <IconMapPin
                size={32}
                className="text-orange-500 group-hover:animate-bounce transition-all"
              />
              <p className="text-3xl md:text-4xl font-bold group-hover:text-orange-500 transition-colors">
                India — Remote
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="group cursor-default">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-3">
              Direct Mail
            </h2>
            <div className="flex items-center gap-3">
              <IconMail
                size={32}
                className="text-indigo-500 group-hover:scale-110 group-hover:-rotate-12 transition-transform"
              />
              <p className="text-2xl md:text-4xl font-bold group-hover:text-indigo-500 transition-colors break-all">
                bhattdeependra01@gmail.com
              </p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">
              Socials
            </h2>
            <div className="flex gap-6">
              <a
                href="https://github.com/Deependra-Bhatt"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-16 h-16 flex items-center justify-center border-4 border-black dark:border-white hover:bg-black dark:hover:bg-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                <IconBrandGithub
                  size={32}
                  className="group-hover:text-white dark:group-hover:text-black transition-colors"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/deependra-bhatt-a4a03329a/"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-16 h-16 flex items-center justify-center border-4 border-black dark:border-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                <IconBrandLinkedin
                  size={32}
                  className="group-hover:text-white transition-colors"
                />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT: The Form Container */}
        <div className="relative group">
          {/* Decorative background block for extra energy */}
          <div className="absolute inset-0 bg-orange-500 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />

          <div className="bg-white dark:bg-zinc-950 p-8 md:p-12 border-4 border-black dark:border-white relative z-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
