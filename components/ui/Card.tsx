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
        "bg-[#1a1a1a] text-white rounded-xl border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.35)]",
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
