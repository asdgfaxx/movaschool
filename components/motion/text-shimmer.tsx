"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Text with an animated shimmering gradient (background-position pan).
 * Respects `prefers-reduced-motion` (static gradient when reduced).
 */
export function TextShimmer({
  children,
  className,
  from = "var(--primary)",
  via = "var(--secondary)",
  to = "var(--accent)",
  duration = 6,
}: {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(110deg, ${from}, ${via}, ${to}, ${via}, ${from})`,
        backgroundSize: "200% 100%",
      }}
      animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={reduce ? undefined : { duration, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.span>
  );
}
