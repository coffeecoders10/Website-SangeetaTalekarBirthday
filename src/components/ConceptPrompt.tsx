"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Concept } from "@/data/concepts";
import { buildPrompt } from "@/lib/concepts";

type ConceptPromptProps = {
  concept: Concept;
};

export function ConceptPrompt({ concept }: ConceptPromptProps) {
  const prompt = buildPrompt(concept);

  return (
    <div className="min-h-[1px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={concept.id}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-rose-300">
            {concept.category}
          </span>
          <h1 className="mt-4 font-serif text-3xl italic leading-tight text-foreground sm:text-4xl md:text-5xl">
            {prompt}
          </h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
