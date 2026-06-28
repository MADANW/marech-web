import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Centered empty / no-results state. */
export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)}>
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-app-faint">
          {icon}
        </div>
      )}
      <h3 className="mb-1 font-semibold text-app-text">{title}</h3>
      {description && <p className="mb-4 max-w-sm text-sm text-app-muted">{description}</p>}
      {action}
    </div>
  );
}
