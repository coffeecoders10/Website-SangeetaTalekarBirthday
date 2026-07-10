"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Concept } from "@/data/concepts";
import { buildPrompt } from "@/lib/concepts";
import { Button } from "./ui/Button";

type ConceptPromptProps = {
  concept: Concept;
  onShuffle: () => void;
};

export function ConceptPrompt({ concept, onShuffle }: ConceptPromptProps) {
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
          <h1 className="font-serif text-3xl italic leading-tight text-foreground sm:text-4xl md:text-5xl">
            {prompt}
          </h1>
        </motion.div>
      </AnimatePresence>

      <Button type="button" variant="secondary" onClick={onShuffle} className="mt-6">
        Shuffle prompt
      </Button>
    </div>
  );
}
