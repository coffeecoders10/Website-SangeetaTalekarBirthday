"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { WishEntry } from "@/types/wish";
import { WishCard } from "./WishCard";
import { WishStackPreview } from "./WishStack";

type WishesCollageProps = {
  groups: WishEntry[][];
  groupLabel?: (entries: WishEntry[]) => string | null;
  transitionKey: string;
};

const LANE_COLORS = [
  { border: "border-rose-300/80", glow: "shadow-[0_0_16px_2px_rgba(253,164,175,0.45)]" },
  { border: "border-amber-200/80", glow: "shadow-[0_0_16px_2px_rgba(253,230,138,0.45)]" },
  { border: "border-fuchsia-400/80", glow: "shadow-[0_0_16px_2px_rgba(232,121,249,0.45)]" },
  { border: "border-sky-300/80", glow: "shadow-[0_0_16px_2px_rgba(125,211,252,0.45)]" },
  { border: "border-emerald-300/80", glow: "shadow-[0_0_16px_2px_rgba(110,231,183,0.45)]" },
  { border: "border-violet-300/80", glow: "shadow-[0_0_16px_2px_rgba(196,181,253,0.45)]" },
];

function laneColorFor(key: string) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  return LANE_COLORS[Math.abs(hash) % LANE_COLORS.length];
}

export function WishesCollage({ groups, groupLabel, transitionKey }: WishesCollageProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (key: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {groups.map((group, groupIndex) => {
          const label = groupLabel?.(group);
          const groupKey = group[0].id;

          if (group.length > 1 && label) {
            const laneColor = laneColorFor(groupKey);

            return (
              <AnimatePresence key={groupKey} mode="popLayout" initial={false}>
                {expandedGroups.has(groupKey)
                  ? group.map((entry, i) => (
                      <motion.div
                        key={entry.id}
                        layoutId={`wish-card-${entry.id}`}
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -16,
                          transition: {
                            delay: (group.length - 1 - i) * 0.04,
                            duration: 0.25,
                            ease: "easeIn",
                          },
                        }}
                        transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                        className="relative"
                      >
                        {i === 0 && (
                          <button
                            type="button"
                            onClick={() => toggleGroup(groupKey)}
                            aria-label={`Collapse ${label} back into a stack`}
                            className="absolute -top-2 -left-2 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-plum-950/90 text-foreground/80 shadow-lg transition-colors hover:text-foreground"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3.5 w-3.5"
                            >
                              <path d="M4 14h6v6" />
                              <path d="M20 10h-6V4" />
                              <path d="M14 10 21 3" />
                              <path d="M3 21l7-7" />
                            </svg>
                          </button>
                        )}
                        <WishCard
                          entry={entry}
                          index={groupIndex + i}
                          borderClassName={laneColor.border}
                          glowClassName={laneColor.glow}
                        />
                      </motion.div>
                    ))
                  : (
                      <WishStackPreview
                        key={groupKey}
                        entries={group}
                        label={label}
                        index={groupIndex}
                        onExpand={() => toggleGroup(groupKey)}
                      />
                    )}
              </AnimatePresence>
            );
          }

          return <WishCard key={groupKey} entry={group[0]} index={groupIndex} />;
        })}
      </motion.div>
    </AnimatePresence>
  );
}
