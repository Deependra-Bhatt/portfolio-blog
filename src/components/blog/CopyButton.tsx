"use client";

import { useState } from "react";

interface CopyButtonProps {
  code: string;
}

export default function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 text-xs px-3 py-1 rounded-md border bg-background"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
