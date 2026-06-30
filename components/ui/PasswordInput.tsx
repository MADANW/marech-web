"use client";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import { EyeIcon } from "@/components/ui/icons";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6a2.75 2.75 0 003.8 3.8" />
      <path d="M9.9 5.6A8.9 8.9 0 0112 5.5c6 0 9.5 6.5 9.5 6.5a14 14 0 01-2.4 3.2M6.2 6.2A14 14 0 002.5 12s3.5 6.5 9.5 6.5a8.7 8.7 0 003.3-.65" />
    </svg>
  );
}

/** Password field with a show/hide visibility toggle. */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-white/70">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={show ? "text" : "password"}
            className={cn(
              "w-full rounded-lg border bg-white/5 px-3 py-2 pr-10 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all",
              error
                ? "border-danger/50 focus:ring-2 focus:ring-danger/30"
                : "border-white/15 focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/40 transition-colors hover:text-white/80"
          >
            {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
