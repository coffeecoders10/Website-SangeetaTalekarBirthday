import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-2xl border bg-white/5 px-4 py-3 text-foreground placeholder:text-foreground/40 outline-none transition-colors resize-none",
          "focus:border-rose-300/60 focus:bg-white/10",
          hasError ? "border-red-400/70" : "border-white/15",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
