"use client";

import { motion, useReducedMotion } from "motion/react";

const RIBBON_COLORS = [
  "bg-amber-300",
  "bg-rose-300",
  "bg-amber-200",
  "bg-rose-400",
  "bg-white",
  "bg-plum-300",
];

const RIBBONS = Array.from({ length: 28 }, (_, i) => {
  const spread = ((i * 137) % 100) - 50;
  return {
    id: i,
    left: 50 + spread * 0.9,
    color: RIBBON_COLORS[i % RIBBON_COLORS.length],
    width: 6 + (i % 3) * 3,
    height: 14 + (i % 4) * 6,
    delay: (i % 10) * 0.05,
    duration: 2.2 + (i % 5) * 0.3,
    rotate: ((i * 53) % 360) - 180,
    drift: ((i * 29) % 160) - 80,
    fallDistance: 420 + (i % 6) * 40,
  };
});

export function RibbonBurst() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[32rem] overflow-hidden"
      aria-hidden="true"
    >
      {RIBBONS.map((ribbon) => (
        <motion.span
          key={ribbon.id}
          className={`absolute rounded-sm ${ribbon.color}`}
          style={{
            left: `${ribbon.left}%`,
            top: "-2rem",
            width: ribbon.width,
            height: ribbon.height,
          }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: ribbon.fallDistance,
            x: ribbon.drift,
            opacity: [0, 1, 1, 0],
            rotate: ribbon.rotate,
          }}
          transition={{
            duration: ribbon.duration,
            delay: ribbon.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
