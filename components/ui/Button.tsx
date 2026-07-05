import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "ghost-dark" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  ghost:
    "text-white/70 rounded-full hover:text-white hover:bg-white/10 active:scale-[0.97]",
  primary:
    "bg-accent text-white rounded-full hover:bg-accent-dark active:scale-[0.97] shadow-sm",
  accent:
    "bg-accent text-white rounded-full hover:bg-accent-dark active:scale-[0.97] shadow-sm",
  secondary:
    "bg-transparent text-white rounded-full border border-white/25 hover:bg-white/10 hover:border-white/40 active:scale-[0.97] backdrop-blur-sm",
  "ghost-dark":
    "text-white/70 rounded-full hover:text-white hover:bg-white/10 active:scale-[0.97]",
  danger:
    "bg-danger text-white rounded-full hover:bg-red-700 active:scale-[0.97] shadow-sm",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs font-semibold",
  md: "px-5 py-2.5 text-sm font-semibold",
  lg: "px-7 py-3 text-base font-semibold",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        "disabled:opacity-50 disabled:pointer-events-none",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
