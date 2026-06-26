"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a radial-gradient glow that follows the cursor via CSS variables
 * `--x` / `--y` (in %). Relies on the `.spotlight-radial` utility for the glow
 * layer; sets `--spotlight-radius` to override the default 320px.
 * Server-renderable shell; pointer tracking is a no-op on the server.
 */
export function SpotlightCard({
  children,
  className,
  as,
  radius = 320,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  radius?: number;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      className={cn("spotlight-radial", className)}
      style={{ ["--spotlight-radius" as string]: `${radius}px` }}
    >
      {children}
    </Tag>
  );
}
