"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite horizontal marquee. Duplicates `children` once for a seamless loop
 * and translates the track by -50% via the existing `marquee` keyframe.
 * Pause on hover and reverse direction are handled with inline CSS so the
 * global `prefers-reduced-motion` rule disables the animation automatically.
 */
export function Marquee({
  children,
  className,
  speed = 40,
  direction = "left",
  pauseOnHover = true,
  gapClassName = "gap-8",
}: {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. Lower = faster. */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gapClassName?: string;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      aria-live="off"
      aria-atomic="false"
    >
      <div
        className={cn("flex shrink-0", gapClassName)}
        style={{
          animation: `${direction === "right" ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
        data-pause-on-hover={pauseOnHover ? "" : undefined}
      >
        <div className={cn("flex shrink-0", gapClassName)}>{children}</div>
        <div className={cn("flex shrink-0", gapClassName)} aria-hidden>
          {children}
        </div>
      </div>
      {pauseOnHover && (
        <style>{`.group:hover [data-pause-on-hover] { animation-play-state: paused !important; }`}</style>
      )}
    </div>
  );
}
