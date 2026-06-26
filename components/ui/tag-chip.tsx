import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TagChipTone = "primary" | "secondary" | "accent" | "gold" | "neutral";

const tones: Record<TagChipTone, string> = {
  primary: "border-primary/30 text-primary",
  secondary: "border-secondary/30 text-secondary",
  accent: "border-accent/30 text-accent",
  gold: "border-gold/40 text-gold",
  neutral: "border-border text-muted-foreground",
};

/** Outlined chip for tags (subjects, blog tags, languages). */
export function TagChip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: TagChipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-transparent px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
