import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl shadow-2xl shadow-plum-950/40",
        className
      )}
      {...props}
    />
  );
}
