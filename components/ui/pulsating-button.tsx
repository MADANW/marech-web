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
  pulseColor = "var(--color-accent)",
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
        className="absolute inset-0 -z-0 animate-pulse-ring rounded-full"
        style={{ backgroundColor: "var(--pulse-color)" }}
      />
    </button>
  );
}
