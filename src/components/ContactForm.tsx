"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/mvzdyvbz", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="group space-y-10">
      {status === "SUCCESS" && (
        <div className="p-4 bg-green-500 text-white font-bold animate-bounce mb-4">
          ✓ Message sent! I'll get back to you soon.
        </div>
      )}

      {/* Input Group: Name */}
      <div className="relative">
        <input
          required
          name="name"
          type="text"
          placeholder=" "
          className="peer w-full bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 py-3 outline-none focus:border-orange-500 transition-colors text-xl font-bold placeholder-transparent"
        />
        <label
          className="absolute left-0 top-3 -z-10 origin-[0] transform text-sm font-black uppercase tracking-[0.2em] text-zinc-500 duration-300 
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
          peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:text-orange-500
          -translate-y-8 scale-90"
        >
          Your Name
        </label>
      </div>

      {/* Input Group: Email */}
      <div className="relative">
        <input
          required
          name="email"
          type="email"
          placeholder=" "
          className="peer w-full bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 py-3 outline-none focus:border-indigo-500 transition-colors text-xl font-bold placeholder-transparent"
        />
        <label
          className="absolute left-0 top-3 -z-10 origin-[0] transform text-sm font-black uppercase tracking-[0.2em] text-zinc-500 duration-300 
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
          peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:text-indigo-500
          -translate-y-8 scale-90"
        >
          Email Address
        </label>
      </div>

      {/* Input Group: Message */}
      <div className="relative">
        <textarea
          required
          name="message"
          rows={4}
          placeholder=" "
          className="peer w-full bg-transparent border-b-2 border-zinc-300 dark:border-zinc-700 py-3 outline-none focus:border-pink-500 transition-colors text-xl font-bold placeholder-transparent resize-none"
        />
        <label
          className="absolute left-0 top-3 -z-10 origin-[0] transform text-sm font-black uppercase tracking-[0.2em] text-zinc-500 duration-300 
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
          peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:text-pink-500
          -translate-y-8 scale-90"
        >
          The Message
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-tighter text-2xl hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
      >
        Send Message →
      </button>
    </form>
  );
}
