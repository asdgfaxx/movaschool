"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Layer that drifts on scroll for a parallax effect.
 * `speed` in px: negative moves slower/up, positive moves faster/down.
 * Uses viewport scroll; place inside a relatively-positioned parent.
 * Respects `prefers-reduced-motion` (no transform).
 */
export function ParallaxLayer({
  children,
  className,
  speed = -80,
}: {
  children: ReactNode;
  className?: string;
  /** Max vertical offset in px. Negative = drifts up (slower). */
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={reduce ? undefined : { y }}
    >
      {children}
    </motion.div>
  );
}
