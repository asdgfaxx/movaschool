"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/**
 * Thin gradient progress bar fixed to the top of the viewport, width = scroll %.
 * Place once near the root (e.g. in the locale layout). Hidden under reduced motion.
 */
export function ScrollProgress({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--accent))] ${className ?? ""}`}
      style={{ scaleX }}
    />
  );
}
