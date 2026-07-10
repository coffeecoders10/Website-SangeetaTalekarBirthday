"use client";

import { motion, useReducedMotion } from "motion/react";
import type { WishEntry } from "@/types/wish";
import { cn } from "@/lib/cn";

const ROTATIONS = [-3, 2, -1, 3, -2, 1];
const ACCENTS = [
  "from-rose-300/25 to-transparent",
  "from-amber-200/25 to-transparent",
  "from-plum-700/50 to-transparent",
  "from-fuchsia-400/20 to-transparent",
  "from-sky-300/20 to-transparent",
  "from-emerald-300/15 to-transparent",
];

type WishCardProps = {
  entry: WishEntry;
  index: number;
};

export function WishCard({ entry, index }: WishCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, rotate: shouldReduceMotion ? 0 : rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: shouldReduceMotion ? 0 : rotation }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group break-inside-avoid"
    >
      <div
        className={cn(
          "glass-panel relative mb-6 overflow-hidden rounded-3xl p-5 shadow-xl shadow-plum-950/40 transition-shadow duration-300 group-hover:shadow-rose-300/10"
        )}
      >
        <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", accent)} />

        <div className="relative">
          <span className="inline-flex flex-wrap items-baseline gap-x-1.5 rounded-2xl bg-white/8 px-3 py-1.5 text-[11px] tracking-wide text-foreground/70">
            If you were <span className="font-serif text-base italic text-foreground">{entry.conceptLabel}</span> you&apos;d be
          </span>

          <p className="mt-4 font-serif text-lg italic leading-snug text-foreground">
            &ldquo;{entry.answer}&rdquo;
          </p>

          {entry.why && (
            <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/70">{entry.why}</p>
          )}

          {entry.note && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="font-serif text-xs italic leading-relaxed text-foreground/60">{entry.note}</p>
            </div>
          )}

          <div className="mt-5 text-right">
            <span className="font-serif text-base italic text-rose-200/80">
              — {entry.fromName}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
