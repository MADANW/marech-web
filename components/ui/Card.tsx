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
        "bg-white rounded-xl border border-gray-200 shadow-sm",
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
