"use client";
import { useState } from "react";

/**
 * A labeled, copyable code block for the docs and platform guides. Client-only
 * because it uses the clipboard; keep the surrounding page a server component
 * and drop this in where a copyable command or snippet is needed.
 */
export function CopyableCode({
  code,
  label,
  language = "bash",
}: {
  code: string;
  label?: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        /* clipboard blocked — user can still select the text manually */
      }
    );
  }

  return (
    <div className="mars-card--marketing rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
        <span className="text-[11px] text-white/40 font-mono tracking-wide">
          {label ?? language}
        </span>
        <button
          onClick={copy}
          className="text-xs font-medium text-accent hover:text-white transition-colors flex items-center gap-1.5"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="px-4 py-3.5 text-[13px] text-emerald-300/90 leading-relaxed whitespace-pre-wrap break-all font-mono">
        {code}
      </pre>
    </div>
  );
}
