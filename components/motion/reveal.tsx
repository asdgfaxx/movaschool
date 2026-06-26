"use client";

import { type ReactNode, type ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealAs = "div" | "section" | "article" | "li" | "span" | "h1" | "h2" | "h3";

const MOTION_TAGS: Record<RevealAs, ElementType> = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  as?: RevealAs;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const Component = MOTION_TAGS[as];

  return (
    <Component
      className={cn(className)}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
