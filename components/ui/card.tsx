import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "glass" | "clay" | "flat" | "spotlight";

const variants: Record<CardVariant, string> = {
  glass: "glass shadow-soft",
  clay: "bg-surface border border-border shadow-clay",
  flat: "bg-surface-muted border border-transparent",
  spotlight: "bg-surface border border-border shadow-soft",
};

export function Card({
  children,
  className,
  variant = "clay",
  as,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  as?: ElementType;
  /** Lift on hover. */
  hover?: boolean;
}) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      className={cn(
        "rounded-2xl",
        variants[variant],
        hover && "transition-transform duration-200 hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
