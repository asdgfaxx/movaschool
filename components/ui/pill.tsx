import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PillTone = "primary" | "secondary" | "accent" | "gold" | "neutral";

const tones: Record<PillTone, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  accent: "bg-accent/10 text-accent",
  gold: "bg-gold/15 text-gold",
  neutral: "bg-surface-muted text-muted-foreground",
};

/** Small compact label: level code, tag, short status. */
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
