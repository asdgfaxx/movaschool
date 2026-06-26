"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Subtle 3D tilt toward the cursor, with an optional spotlight glow layer. */
export function TiltCard({
  children,
  className,
  intensity = 8,
  spotlight = true,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  /** Render a radial glow that follows the cursor. */
  spotlight?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(px, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(py, { stiffness: 150, damping: 15 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)`;

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    px.set((-cy / rect.height) * intensity * 2);
    py.set((cx / rect.width) * intensity * 2);
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  function reset() {
    px.set(0);
    py.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={cn("group relative", className)}
    >
      {spotlight && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: glowBg,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
