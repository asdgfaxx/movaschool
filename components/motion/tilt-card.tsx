"use client";

import { motion, useMotionValue, useSpring } from "motion/react";

/** Subtle 3D tilt toward the cursor. */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(px, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(py, { stiffness: 150, damping: 15 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    px.set((-cy / rect.height) * intensity * 2);
    py.set((cx / rect.width) * intensity * 2);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
