"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconLockCode } from "@tabler/icons-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!data.success) {
        setError("INVALID ACCESS KEY.");
        return;
      }
      router.push("/admin/create-blog");
      router.refresh();
    } catch (error) {
      setError("COMMUNICATION ERROR.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="relative w-full max-w-md">
        {/* The Hard Shadow */}
        <div className="absolute inset-0 bg-indigo-600 border-4 border-black translate-x-4 translate-y-4" />

        {/* The Content Box */}
        <form
          onSubmit={handleLogin}
          className="relative w-full border-4 border-black bg-white dark:bg-zinc-900 p-10 flex flex-col items-center"
        >
          <div className="bg-orange-500 border-4 border-black p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <IconLockCode size={48} stroke={2.5} className="text-black" />
          </div>

          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Access Portal
          </h1>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">
            Deependra Bhatt // Admin Only
          </p>

          <input
            type="password"
            placeholder="ENTER AUTH KEY"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-4 border-black dark:border-white px-4 py-3 mb-6 bg-zinc-100 dark:bg-zinc-800 font-black focus:outline-none focus:ring-4 focus:ring-pink-500 transition-all"
          />

          {error && (
            <div className="w-full bg-red-100 border-2 border-red-600 p-2 text-red-600 text-xs font-black uppercase mb-6 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-4 border-black bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest py-4 hover:bg-orange-500 hover:text-black transition-colors disabled:opacity-50"
          >
            {loading ? "VERIFYING..." : "INITIALIZE SESSION"}
          </button>
        </form>
      </div>
    </main>
  );
}
