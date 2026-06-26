import { cn } from "@/lib/utils";

type AuroraVariant = "primary" | "gold" | "accent";

const VARIANT_CLASSES: Record<AuroraVariant, { a: string; b: string; c: string }> = {
  primary: {
    a: "bg-primary/30",
    b: "bg-secondary/25",
    c: "bg-accent/20",
  },
  gold: {
    a: "bg-primary/25",
    b: "bg-gold/25",
    c: "bg-copper/20",
  },
  accent: {
    a: "bg-accent/30",
    b: "bg-primary/20",
    c: "bg-secondary/20",
  },
};

/** Decorative animated gradient blobs. Pure CSS animation (no JS). */
export function Aurora({
  className,
  variant = "primary",
}: {
  className?: string;
  variant?: AuroraVariant;
}) {
  const c = VARIANT_CLASSES[variant];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className={cn("animate-aurora absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl", c.a)} />
      <div className={cn("animate-float absolute -right-20 top-0 h-[26rem] w-[26rem] rounded-full blur-3xl", c.b)} />
      <div
        className={cn("animate-aurora absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full blur-3xl", c.c)}
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
