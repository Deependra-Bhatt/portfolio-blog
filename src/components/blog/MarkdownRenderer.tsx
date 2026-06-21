"use client";

import ReactMarkdown from "react-markdown";
import CopyButton from "./CopyButton";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Gracefully handles escaped newlines from raw database strings
  const formattedContent = content.replace(/\\n/g, "\n");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;

          return !isInline ? (
            <div className="relative not-prose my-6">
              <CopyButton code={String(children).replace(/\n$/, "")} />
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-xl"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-muted px-1.5 py-1 rounded text-sm font-mono before:content-none after:content-none dark:bg-zinc-800 text-pink-500 raw-inline-code">
              {children}
            </code>
          );
        },
      }}
    >
      {formattedContent}
    </ReactMarkdown>
  );
}
