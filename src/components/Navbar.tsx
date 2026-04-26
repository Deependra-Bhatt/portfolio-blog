"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b-2 border-black dark:border-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_4px_0px_0px_rgba(255,255,255,1)]"
          : "py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo with energetic hover */}
        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl font-black uppercase tracking-tighter transition-transform group-hover:-rotate-3">
            Deependra
          </span>
          <span className="text-2xl font-black uppercase tracking-tighter text-orange-500 transition-transform group-hover:rotate-3">
            .dev
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 rounded-full ${
                  isActive
                    ? "text-white dark:text-black bg-black dark:bg-white"
                    : "text-zinc-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Action Zone: Theme Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-900 overflow-hidden group active:scale-90 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
          >
            <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
              {theme === "light" ? (
                <IconSun size={20} stroke={2.5} />
              ) : (
                <IconMoon size={20} stroke={2.5} />
              )}
            </div>
          </button>

          {/* Mobile Menu Button (Visual Only) */}
          <button className="md:hidden p-2 text-black dark:text-white">
            <div className="w-6 h-1 bg-current mb-1"></div>
            <div className="w-6 h-1 bg-current"></div>
          </button>
        </div>
      </nav>
    </header>
  );
}
