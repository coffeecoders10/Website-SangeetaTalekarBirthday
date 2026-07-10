"use client";

import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { BackgroundOrnaments } from "@/components/BackgroundOrnaments";
import { Button } from "@/components/ui/Button";
import { WishesCollage } from "@/components/WishesCollage";
import { getWishes } from "@/lib/wishesApi";
import type { WishEntry } from "@/types/wish";

type FetchState = "loading" | "success" | "error";

export default function WishesPage() {
  const [entries, setEntries] = useState<WishEntry[]>([]);
  const [state, setState] = useState<FetchState>("loading");

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

        {state === "success" && entries.length > 0 && <WishesCollage entries={entries} />}
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
