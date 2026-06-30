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
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold",
        {
          success: "bg-success/12 text-success",
          danger: "bg-danger/12 text-red-300",
          warning: "bg-warning/12 text-warning",
          neutral: "bg-white/8 text-app-muted",
          primary: "bg-accent/12 text-accent",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
