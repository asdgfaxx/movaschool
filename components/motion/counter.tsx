"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

/** Counts a numeric value up when it scrolls into view. Keeps any prefix/suffix. */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const match = value.match(/\d[\d\s]*/);
  const [display, setDisplay] = useState(match ? value.replace(/\d/g, "0") : value);

  useEffect(() => {
    if (!inView || !match) return;
    const digits = match[0];
    const target = parseInt(digits.replace(/\s/g, ""), 10);
    const start = match.index ?? 0;
    const prefix = value.slice(0, start);
    const suffix = value.slice(start + digits.length);
    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(prefix + Math.round(v).toLocaleString("pl-PL") + suffix),
    });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
