"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

type SubmitStateProps = {
  status: SubmitStatus;
  errorMessage?: string;
};

export function SubmitState({ status, errorMessage }: SubmitStateProps) {
  return (
    <AnimatePresence mode="wait">
      {status === "success" && (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200"
          )}
        >
          Added to the collage.{" "}
          <Link href="/wishes" className="font-semibold underline underline-offset-4">
            See the collage
          </Link>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          key="error"
          role="alert"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {errorMessage ?? "Something went wrong. Please try again."}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
