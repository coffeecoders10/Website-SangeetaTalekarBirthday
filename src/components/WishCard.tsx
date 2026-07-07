"use client";

import { motion, useReducedMotion } from "motion/react";
import type { WishEntry } from "@/types/wish";
import { cn } from "@/lib/cn";

const ROTATIONS = [-3, 2, -1, 3, -2, 1];
const ACCENTS = [
  "from-rose-300/20 to-transparent",
  "from-amber-200/20 to-transparent",
  "from-plum-700/40 to-transparent",
];

function formatDate(isoString: string) {
  try {
    return new Date(isoString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

type WishCardProps = {
  entry: WishEntry;
  index: number;
};

export function WishCard({ entry, index }: WishCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const accent = ACCENTS[index % ACCENTS.length];
  const date = formatDate(entry.createdAt);

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
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-rose-300">
            {entry.conceptLabel}
          </span>

          {entry.imageUrl && (
            <div className="mt-4 overflow-hidden rounded-2xl">
              <img
                src={entry.imageUrl}
                alt={entry.imageAlt ?? `Image shared with ${entry.fromName}'s wish`}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <p className="mt-4 font-serif text-lg italic leading-snug text-foreground">
            &ldquo;{entry.answer}&rdquo;
          </p>

          {entry.note && (
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">{entry.note}</p>
          )}

          <div className="mt-5 flex items-center justify-between text-xs text-foreground/50">
            <span>From {entry.fromName}</span>
            {date && <span>{date}</span>}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
