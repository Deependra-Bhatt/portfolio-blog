"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { IconMoon, IconSun, IconMenu2, IconX } from "@tabler/icons-react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // To set mounting of element
  useEffect(() => {
    setMounted(true);
  }, []);

  // Monitor scroll for header styling & progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      {/* SCROLL PROGRESS BAR - Highly Energetic touch */}
      <div
        className="fixed top-0 left-0 h-1.5 bg-orange-500 z-[100] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${
          scrolled || isOpen
            ? "py-3 bg-white/90 dark:bg-black/95 backdrop-blur-xl border-b-2 border-black dark:border-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_4px_0px_0px_rgba(255,255,255,1)]"
            : "py-6 bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with interactive hover */}
          <Link
            href="/"
            className="group flex items-center gap-1 z-[70] outline-none"
            onClick={() => setIsOpen(false)}
          >
            <span className="text-2xl font-black uppercase tracking-tighter transition-all group-hover:-rotate-3 group-active:scale-95">
              Deependra
            </span>
            <span className="text-2xl font-black uppercase tracking-tighter text-orange-500 transition-all group-hover:rotate-3 group-active:scale-95">
              .dev
            </span>
          </Link>

          {/* Desktop Nav - Pill Style */}
          <div className="hidden md:flex items-center bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-full border border-zinc-300 dark:border-zinc-700">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full ${
                    isActive
                      ? "text-white dark:text-black bg-black dark:bg-white shadow-lg"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Action Zone */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Physical Button Feel */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative p-2 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-zinc-900 active:scale-90 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              <div className="relative z-10 transition-transform duration-500">
                {theme === "light" ? (
                  <IconSun size={20} stroke={2.5} />
                ) : (
                  <IconMoon size={20} stroke={2.5} />
                )}
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl border-2 border-black dark:border-white bg-orange-500 text-white active:scale-95 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
            >
              {isOpen ? (
                <IconX size={24} stroke={3} />
              ) : (
                <IconMenu2 size={24} stroke={3} />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Full Screen High Energy */}
      <div
        className={`fixed inset-0 z-[55] bg-white dark:bg-black transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] md:hidden flex flex-col items-center justify-center ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        {/* Subtle grid pattern for mobile background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[grid-black_1px_1px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        <div className="flex flex-col items-center gap-8 w-full px-10 relative z-10">
          {navItems.map((item, index) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`text-5xl font-black uppercase tracking-tighter transition-all hover:text-orange-500 active:scale-90 ${
                  isActive
                    ? "text-orange-500 italic scale-110"
                    : "text-black dark:text-white"
                }`}
                style={{
                  transitionDelay: isOpen ? `${index * 70}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(40px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Branding Footer for Mobile Menu */}
        <div
          className={`absolute bottom-12 text-center transition-all duration-700 delay-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 dark:text-zinc-600">
            Crafting with intent // {mounted ? new Date().getFullYear() : ""}
          </p>
        </div>
      </div>
    </>
  );
}
