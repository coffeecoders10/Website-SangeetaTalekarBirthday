"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BackgroundOrnaments } from "@/components/BackgroundOrnaments";
import { ConceptPrompt } from "@/components/ConceptPrompt";
import { Card } from "@/components/ui/Card";
import { WishForm } from "@/components/WishForm";
import { PERSON_PROFILE } from "@/config/person";
import { CONCEPTS } from "@/data/concepts";
import { getRandomConcept } from "@/lib/concepts";

export default function Home() {
  const [concept, setConcept] = useState(() => CONCEPTS[0]);

  useEffect(() => {
    setConcept((current) => getRandomConcept(current.id));
  }, []);

  const handleShuffle = useCallback(() => {
    setConcept((current) => getRandomConcept(current.id));
  }, []);

  return (
    <main className="relative flex-1">
      <BackgroundOrnaments />

      <div className="relative z-10 mx-auto flex h-screen w-full max-w-5xl flex-col justify-center gap-6 overflow-hidden px-6 py-6 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex min-h-0 flex-1 flex-col justify-center"
        >
          <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-amber-200">
            A collage for {PERSON_PROFILE.name}
          </span>

          <div className="mt-6">
            <ConceptPrompt concept={concept} />
          </div>

          <p className="mt-6 max-w-md text-foreground/70">
            Answer the prompt above, add a note if you want, and sign it from you.
            Shuffle until the prompt feels right.
          </p>

          <Link
            href="/wishes"
            className="mt-8 inline-flex items-center gap-2 text-sm text-rose-300 underline underline-offset-4"
          >
            See the full collage &rarr;
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="flex min-h-0 flex-1 flex-col justify-center"
        >
          <Card className="flex max-h-full flex-col overflow-y-auto p-6 sm:p-8">
            <WishForm
              concept={concept}
              onShuffle={handleShuffle}
              onSubmitted={() => {}}
            />
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
