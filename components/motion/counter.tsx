"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { EASE } from "@/lib/motion";

const LOCALE_MAP: Record<string, string> = {
  pl: "pl-PL",
  ru: "ru-RU",
};

/**
 * Counts a numeric value up when it scrolls into view. Keeps any prefix/suffix
 * and supports decimals (e.g. "4.9"). `locale` controls number formatting
 * (defaults to pl-PL to preserve prior behaviour).
 */
export function Counter({
  value,
  className,
  locale,
}: {
  value: string;
  className?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion() ?? false;
  const intlLocale = LOCALE_MAP[locale ?? "pl"] ?? "pl-PL";
  // Memoize the regex match so its reference is stable across renders —
  // otherwise it would retrigger the animation effect on every frame.
  const match = useMemo(() => value.match(/\d[\d\s.,]*/), [value]);
  const [animatedDisplay, setAnimatedDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!inView || !match || reduce) return;

    const raw = match[0];
    const hasDecimal = /[.,]/.test(raw);
    const normalized = raw.replace(/\s/g, "").replace(",", ".");
    const target = parseFloat(normalized);
    const decimals = hasDecimal ? (normalized.split(".")[1]?.length ?? 1) : 0;
    const start = match.index ?? 0;
    const prefix = value.slice(0, start);
    const suffix = value.slice(start + raw.length);

    const controls = animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => {
        const formatted = target % 1 !== 0 || decimals > 0
          ? v.toLocaleString(intlLocale, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : Math.round(v).toLocaleString(intlLocale);
        setAnimatedDisplay(prefix + formatted + suffix);
      },
      onComplete: () => {
        setAnimatedDisplay(null);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, intlLocale, match]);

  return (
    <span ref={ref} className={className}>
      {animatedDisplay ?? value}
    </span>
  );
}
