"use client";

import { motion, useReducedMotion } from "motion/react";

const STARS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: (i * 37) % 100,
  left: (i * 53) % 100,
  size: (i % 3) + 1,
  delay: (i % 6) * 0.4,
}));

export function BackgroundOrnaments() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-plum-950 via-plum-900 to-plum-950" />

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-rose-300/20 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-amber-200/15 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-plum-700/40 blur-3xl" />

      {STARS.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white/70"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.2, 0.9, 0.2], scale: [1, 1.3, 1] }
          }
          transition={{
            duration: 3 + star.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
