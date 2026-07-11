"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BackgroundOrnaments } from "@/components/BackgroundOrnaments";
import { Button } from "@/components/ui/Button";
import { WishesCollage } from "@/components/WishesCollage";
import { cn } from "@/lib/cn";
import { getWishes } from "@/lib/wishesApi";
import type { WishEntry } from "@/types/wish";

type FetchState = "loading" | "success" | "error";

type GroupMode = "none" | "sender" | "concept";

const GROUP_OPTIONS: { value: GroupMode; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sender", label: "Sender" },
  { value: "concept", label: "Concept" },
];

function groupEntries(entries: WishEntry[], mode: GroupMode): WishEntry[][] {
  if (mode === "none") return entries.map((entry) => [entry]);

  const keyFor = (entry: WishEntry) =>
    (mode === "sender" ? entry.fromName : entry.conceptId).trim().toLowerCase();

  const order: string[] = [];
  const groups = new Map<string, WishEntry[]>();

  for (const entry of entries) {
    const key = keyFor(entry);
    if (!groups.has(key)) {
      groups.set(key, []);
      order.push(key);
    }
    groups.get(key)!.push(entry);
  }

  return order
    .map((key) => groups.get(key)!)
    .sort((a, b) => b.length - a.length);
}

export default function WishesPage() {
  const [entries, setEntries] = useState<WishEntry[]>([]);
  const [state, setState] = useState<FetchState>("loading");
  const [groupMode, setGroupMode] = useState<GroupMode>("none");

  const groups = useMemo(() => groupEntries(entries, groupMode), [entries, groupMode]);

  const groupLabel = useCallback(
    (group: WishEntry[]) => {
      if (groupMode === "sender") return group[0].fromName;
      if (groupMode === "concept") return group[0].conceptLabel;
      return null;
    },
    [groupMode]
  );

  const fetchWishes = useCallback(() => {
    getWishes()
      .then((data) => {
        setEntries(data);
        setState("success");
      })
      .catch(() => {
        setState("error");
      });
  }, []);

  const retry = useCallback(() => {
    setState("loading");
    fetchWishes();
  }, [fetchWishes]);

  useEffect(() => {
    fetchWishes();
  }, [fetchWishes]);

  return (
    <main className="relative flex-1">
      <BackgroundOrnaments />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-amber-200">
            One person, infinite metaphors
          </span>
          <h1 className="mt-4 font-serif text-3xl italic leading-tight text-foreground sm:text-4xl md:text-5xl">
            A collage of what you mean to everyone
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/60">
            Everyone answered a simmple question - what you'd be if you were something else entirely — and they answered it in their own way. <br/> Here's what we came up with.
          </p>
        </motion.div>

        {state === "success" && entries.length > 0 && (
          <div className="mb-8 flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-widest text-foreground/50">Group by</span>
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
              {GROUP_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGroupMode(option.value)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs transition-colors cursor-pointer",
                    groupMode === option.value
                      ? "bg-white/15 text-foreground"
                      : "text-foreground/60 hover:text-foreground/90"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {state === "loading" && <CollageSkeleton />}

        {state === "error" && (
          <div className="mx-auto max-w-md rounded-3xl border border-red-400/30 bg-red-400/10 px-6 py-10 text-center">
            <p className="text-foreground/90">
              We couldn&apos;t load the collage right now.
            </p>
            <Button variant="secondary" className="mt-4" onClick={retry}>
              Try again
            </Button>
          </div>
        )}

        {state === "success" && entries.length === 0 && (
          <div className="mx-auto max-w-md rounded-3xl border border-white/15 bg-white/5 px-6 py-10 text-center">
            <p className="text-foreground/90">
              The wishes are still on their way in. Check back soon.
            </p>
          </div>
        )}

        {state === "success" && entries.length > 0 && (
          <WishesCollage groups={groups} groupLabel={groupLabel} transitionKey={groupMode} />
        )}
      </div>
    </main>
  );
}

function CollageSkeleton() {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4" aria-busy="true" aria-label="Loading wishes">
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          className="mb-6 h-64 animate-pulse break-inside-avoid rounded-3xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}
