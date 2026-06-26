import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "gold"
  | "outline"
  | "glass";
export type BadgeSize = "sm" | "md";

const variants: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary border-transparent",
  secondary: "bg-secondary/10 text-secondary border-transparent",
  accent: "bg-accent/10 text-accent border-transparent",
  gold: "bg-gold/15 text-gold border-transparent",
  outline: "bg-transparent text-muted-foreground border-border",
  glass: "glass text-foreground border-transparent",
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  className,
  children,
  variant = "outline",
  size = "md",
}: {
  className?: string;
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold tracking-wide",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
