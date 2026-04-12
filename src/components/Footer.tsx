export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
      <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-zinc-500 flex justify-between">
        <span>© {new Date().getFullYear()} Deependra Bhatt</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
