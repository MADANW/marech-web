import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "success" | "danger" | "warning" | "neutral" | "primary";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
        {
          success: "bg-success/15 text-success border border-success/25",
          danger: "bg-danger/15 text-red-300 border border-danger/30",
          warning: "bg-warning/15 text-warning border border-warning/25",
          neutral: "bg-white/10 text-white/70 border border-white/10",
          primary: "bg-accent/15 text-accent border border-accent/25",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
