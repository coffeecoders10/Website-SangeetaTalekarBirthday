"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PERSON_PROFILE } from "@/config/person";
import type { Concept } from "@/data/concepts";
import { buildPrompt } from "@/lib/concepts";
import { createWish } from "@/lib/wishesApi";
import type { WishEntry } from "@/types/wish";
import { SubmitState, type SubmitStatus } from "./SubmitState";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";

const wishFormSchema = z.object({
  answer: z.string().min(1, "Give us your answer.").max(140, "Keep it under 140 characters."),
  why: z.string().min(2, "Tell us why.").max(500, "Keep it under 500 characters."),
  note: z.string().max(1200, "Keep the note under 1200 characters.").optional().or(z.literal("")),
  fromName: z.string().min(1, "Let them know who this is from.").max(80, "Keep the name under 80 characters."),
});

type WishFormValues = z.infer<typeof wishFormSchema>;

type WishFormProps = {
  concept: Concept;
  onShuffle: () => void;
  onSubmitted: (entry: WishEntry) => void;
};

export function WishForm({ concept, onShuffle, onSubmitted }: WishFormProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WishFormValues>({
    resolver: zodResolver(wishFormSchema),
    defaultValues: { answer: "", why: "", note: "", fromName: "" },
  });

  const onSubmit = async (values: WishFormValues) => {
    setStatus("loading");
    setErrorMessage(undefined);

    try {
      const entry = await createWish({
        targetName: PERSON_PROFILE.name,
        conceptId: concept.id,
        conceptLabel: concept.label,
        prompt: buildPrompt(concept),
        answer: values.answer,
        why: values.why,
        note: values.note || undefined,
        fromName: values.fromName,
      });

      setStatus("success");
      reset();
      onSubmitted(entry);
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't save your wish. Please try again.");
    }
  };

  const handleAnswerAnother = () => {
    setStatus("idle");
    setErrorMessage(undefined);
    onShuffle();
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <SubmitState status={status} onAnswerAnother={handleAnswerAnother} />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4 text-[0.8rem] sm:text-[0.875rem]"
          noValidate
        >
          <p className="text-[0.7rem] text-foreground/60 sm:text-[0.75rem]">
            Answer the question and sign it with your name. <br /> Feel free to answer as many prompts as you'd like — each one becomes part of {PERSON_PROFILE.name}'s collage.
          </p>

          <div>
            <label htmlFor="answer" className="mb-1.5 block font-medium text-foreground/80">
              Your answer
            </label>
            <Input
              id="answer"
              placeholder={concept.placeholder ?? "Type your answer..."}
              hasError={Boolean(errors.answer)}
              aria-invalid={Boolean(errors.answer)}
              aria-describedby={errors.answer ? "answer-error" : undefined}
              className="px-3 py-2 text-[0.8rem] sm:text-[0.875rem]"
              {...register("answer")}
            />
            {errors.answer && (
              <p id="answer-error" className="mt-1 text-[0.75rem] text-red-300">
                {errors.answer.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="why" className="mb-1.5 block font-medium text-foreground/80">
              Why?
            </label>
            <Textarea
              id="why"
              rows={3}
              placeholder="Tell us why you answered that..."
              hasError={Boolean(errors.why)}
              aria-invalid={Boolean(errors.why)}
              aria-describedby={errors.why ? "why-error" : undefined}
              className="px-3 py-2 text-[0.8rem] sm:text-[0.875rem]"
              {...register("why")}
            />
            {errors.why && (
              <p id="why-error" className="mt-1 text-[0.75rem] text-red-300">
                {errors.why.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="fromName" className="mb-1.5 block font-medium text-foreground/80">
              From
            </label>
            <Input
              id="fromName"
              placeholder="Your name"
              hasError={Boolean(errors.fromName)}
              aria-invalid={Boolean(errors.fromName)}
              aria-describedby={errors.fromName ? "fromName-error" : undefined}
              className="px-3 py-2 text-[0.8rem] sm:text-[0.875rem]"
              {...register("fromName")}
            />
            {errors.fromName && (
              <p id="fromName-error" className="mt-1 text-[0.75rem] text-red-300">
                {errors.fromName.message}
              </p>
            )}
          </div>

          <hr className="border-t border-white/10" />

          <div>
            <label htmlFor="note" className="mb-1.5 block font-medium text-foreground/80">
              Special Message (optional)
            </label>
            <Textarea
              id="note"
              rows={3}
              placeholder="Happy birthday..."
              hasError={Boolean(errors.note)}
              aria-invalid={Boolean(errors.note)}
              aria-describedby={errors.note ? "note-error" : undefined}
              className="px-3 py-2 text-[0.8rem] sm:text-[0.875rem]"
              {...register("note")}
            />
            {errors.note && (
              <p id="note-error" className="mt-1 text-[0.75rem] text-red-300">
                {errors.note.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 text-[0.8rem] sm:text-[0.875rem]"
          >
            {status === "loading" ? "Adding..." : "Add my answer"}
          </Button>

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SubmitState status={status} errorMessage={errorMessage} />
            </motion.div>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
