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
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;

          const match = /language-(\w+)/.exec(className || "");

          const isInline = !match;

          return !isInline ? (
            <div className="relative">
              <CopyButton code={String(children).replace(/\n$/, "")} />

              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                className="rounded-xl !mt-6 !mb-6"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className="bg-muted px-1.5 py-1 rounded text-sm">
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
