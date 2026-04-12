"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import { IconMoon, IconSun } from "@tabler/icons-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Resume", href: "/resume" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Deependra.dev
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors ${
                  isActive
                    ? "text-black dark:text-white font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 text-sm px-3 py-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            {theme === "light" ? (
              <IconSun />
            ) : (
              <IconMoon />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
