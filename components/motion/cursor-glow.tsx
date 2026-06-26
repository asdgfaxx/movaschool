"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

function subscribePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function readFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

/**
 * Global soft-glow circle that trails the cursor. Fixed, pointer-events-none.
 * Only active on fine-pointer devices (mouse); disabled on touch and under
 * `prefers-reduced-motion`. Place once near the root.
 */
export function CursorGlow({ size = 360 }: { size?: number }) {
  const reduce = useReducedMotion() ?? false;
  const finePointer = useSyncExternalStore(subscribePointer, readFinePointer, () => false);
  const enabled = finePointer && !reduce;

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, size, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[55] rounded-full"
      style={{
        width: size,
        height: size,
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
