"use client";

import { ButtonHTMLAttributes, CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pulseColor?: string;
  duration?: string;
}

export function PulsatingButton({
  className,
  children,
  pulseColor = "#f97316",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-base font-semibold text-white shadow-sm transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as CSSProperties
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute left-1/2 top-1/2 -z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full"
        style={{ backgroundColor: "var(--pulse-color)" }}
      />
    </button>
  );
}
