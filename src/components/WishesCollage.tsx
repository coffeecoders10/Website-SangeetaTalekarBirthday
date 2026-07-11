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
                        className="rounded-3xl bg-white/[0.04] p-1.5"
                      >
                        {i === 0 && (
                          <button
                            type="button"
                            onClick={() => toggleGroup(groupKey)}
                            className="mb-1.5 flex w-full cursor-pointer items-center justify-between rounded-full px-2 py-1 text-left"
                          >
                            <span className="font-serif text-xs italic text-foreground/70">{label}</span>
                            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-foreground/60">
                              Collapse
                            </span>
                          </button>
                        )}
                        <WishCard entry={entry} index={groupIndex + i} />
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
