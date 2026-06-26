"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { buttonClasses, type ButtonVariant, type ButtonSize } from "@/components/ui/button";

/**
 * Button / Link that is magnetically attracted toward the cursor by a few px.
 * Renders a Next.js `<Link>` when `href` is provided, otherwise a `<button>`.
 * Respects `prefers-reduced-motion` (no displacement when reduced).
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  strength = 6,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Max displacement in px. */
  strength?: number;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set(((e.clientX - cx) / (rect.width / 2)) * strength);
    y.set(((e.clientY - cy) / (rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = buttonClasses({ variant, size, className });
  const motionStyle = reduce ? undefined : { x: sx, y: sy };

  const content = (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={motionStyle}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
