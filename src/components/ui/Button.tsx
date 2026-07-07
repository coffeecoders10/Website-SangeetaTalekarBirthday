"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-rose-300 via-amber-200 to-rose-300 text-plum-950 font-semibold shadow-lg shadow-rose-300/20",
  secondary: "glass-panel text-foreground/90 hover:text-foreground",
  ghost: "text-foreground/70 hover:text-foreground underline underline-offset-4",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled}
        whileHover={disabled ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          VARIANT_CLASSES[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
