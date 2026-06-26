"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Staggered reveal group with a configurable stagger distance.
 * Under `prefers-reduced-motion` children appear instantly (no transition).
 * Pair with `RevealGroupItem`.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {},
        show: reduce
          ? {}
          : { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroupItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: reduce ? { duration: 0 } : { duration: 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
