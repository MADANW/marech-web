"use client";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom";
  className?: string;
}

/** Lightweight hover/focus tooltip in the Mars surface style. */
export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  if (content === null || content === undefined || content === "") return <>{children}</>;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            "mars-card pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-app-text shadow-2xl",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
            className
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
