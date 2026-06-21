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
          success: "bg-success-light text-emerald-800",
          danger: "bg-danger-light text-red-800",
          warning: "bg-warning-light text-amber-800",
          neutral: "bg-gray-100 text-gray-700",
          primary: "bg-primary-light text-primary",
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
