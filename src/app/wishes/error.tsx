"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function WishesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex flex-1 items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-red-400/30 bg-red-400/10 px-6 py-10 text-center">
        <p className="text-foreground/90">
          Something went wrong loading the collage.
        </p>
        <Button variant="secondary" className="mt-4" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
