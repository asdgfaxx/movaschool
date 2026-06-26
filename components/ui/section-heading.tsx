import { type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export type HeadingLevel = "h1" | "h2" | "h3";

export function SectionHeading({
  kicker,
  eyebrow,
  title,
  subtitle,
  align = "center",
  as = "h2",
  showLine = false,
  className,
}: {
  kicker?: string;
  /** Small label above the title, separate from the pill-style kicker. */
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  as?: HeadingLevel;
  /** Decorative gradient line under the eyebrow. */
  showLine?: boolean;
  className?: string;
}) {
  const Tag = as as ElementType;

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </span>
        </Reveal>
      )}
      {showLine && (
        <Reveal>
          <span
            aria-hidden
            className={cn(
              "h-px w-16 bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--accent))]",
              align === "center" && "mx-auto",
            )}
          />
        </Reveal>
      )}
      {kicker && (
        <Reveal>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag className="text-3xl font-extrabold leading-[1.1] text-balance sm:text-4xl lg:text-5xl">
          {title}
        </Tag>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={cn("max-w-2xl text-base text-muted-foreground sm:text-lg", align === "center" && "mx-auto")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
