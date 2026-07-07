import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-2xl border bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/40 outline-none transition-colors",
          "focus:border-rose-300/60 focus:bg-white/10",
          hasError ? "border-red-400/70" : "border-white/15",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
