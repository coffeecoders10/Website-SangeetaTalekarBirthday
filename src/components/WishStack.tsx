"use client";

import { motion, useReducedMotion } from "motion/react";
import type { WishEntry } from "@/types/wish";
import { WishCard } from "./WishCard";

const PEEK_ROTATIONS = [-6, 4, -3, 5, -4, -2, 6, -5, 3, -4];

function tiltFor(entry: WishEntry, fallbackIndex: number) {
  let hash = 0;
  for (let i = 0; i < entry.id.length; i++) {
    hash = (hash * 31 + entry.id.charCodeAt(i)) | 0;
  }
  const source = entry.id ? Math.abs(hash) : fallbackIndex;
  return PEEK_ROTATIONS[source % PEEK_ROTATIONS.length];
}

type WishStackPreviewProps = {
  entries: WishEntry[];
  label: string;
  index: number;
  onExpand: () => void;
};

export function WishStackPreview({ entries, label, index, onExpand }: WishStackPreviewProps) {
  const shouldReduceMotion = useReducedMotion();
  const visibleDepth = Math.min(entries.length, 5);
  const visibleEntries = entries.slice(0, 5);

  return (
    <motion.button
      type="button"
      onClick={onExpand}
      aria-label={`Expand ${entries.length} wishes from ${label}`}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="group relative block w-full cursor-pointer text-left"
      style={{ height: `${16 + visibleDepth * 0.6}rem` }}
    >
      {visibleEntries.map((entry, i) => {
        const depth = visibleDepth - 1 - i;
        const tilt = tiltFor(entry, i);
        return (
          <motion.div
            key={entry.id}
            layoutId={`wish-card-${entry.id}`}
            initial={
              shouldReduceMotion ? false : { y: -60, opacity: 0, rotate: 0, scale: 1.05 }
            }
            animate={{
              y: depth * 10,
              opacity: 1,
              rotate: shouldReduceMotion ? 0 : tilt,
              scale: 1 - depth * 0.03,
            }}
            transition={{
              duration: 0.35,
              delay: shouldReduceMotion ? 0 : (visibleDepth - 1 - depth) * 0.06,
              ease: "easeOut",
            }}
            className="absolute inset-x-0 top-0 origin-top transition-transform duration-300 group-hover:!translate-y-[calc(var(--base-offset)_-_4px)]"
            style={{ "--base-offset": `${depth * 10}px`, zIndex: i } as React.CSSProperties}
          >
            <WishCard entry={entry} index={index + i} variant="stackTop" />
          </motion.div>
        );
      })}

      <span className="absolute -right-2 -top-2 z-10 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 bg-plum-950/90 px-2 text-xs font-semibold text-foreground shadow-lg">
        {entries.length}
      </span>
    </motion.button>
  );
}
