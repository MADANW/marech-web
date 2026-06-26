import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg" | "none";
}

export function Card({ children, className, padding = "md" }: CardProps) {
  return (
    <div
      className={cn(
        "bg-app-card text-app-text rounded-xl border border-app-border",
        {
          none: "",
          sm: "p-4",
          md: "p-6",
          lg: "p-8",
        }[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
