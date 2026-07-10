"use client";

import { AnimatePresence, motion } from "motion/react";
import { PERSON_PROFILE } from "@/config/person";
import { Button } from "./ui/Button";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

type SubmitStateProps = {
  status: SubmitStatus;
  errorMessage?: string;
  onAnswerAnother?: () => void;
};

export function SubmitState({ status, errorMessage, onAnswerAnother }: SubmitStateProps) {
  return (
    <AnimatePresence mode="wait">
      {status === "success" && (
        <motion.div
          key="success"
          role="status"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 rounded-2xl border border-amber-200/30 bg-amber-200/10 px-6 py-10 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-rose-300"
          >
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-plum-950"
            >
              <motion.path
                d="M4 12.5L9.5 18L20 6.5"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="space-y-1"
          >
            <p className="text-base font-semibold text-amber-100">
              Saved! She is going to love this.
            </p>
            <p className="text-sm text-foreground/60">
              Want to try another one? The collage always has room for one more.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.65 }}
          >
            <Button type="button" onClick={onAnswerAnother} className="px-6 py-2.5 text-sm">
              Add another answer
            </Button>
          </motion.div>
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
