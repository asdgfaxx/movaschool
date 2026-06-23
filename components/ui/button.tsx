import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-[transform,box-shadow,background-color,color] duration-200 will-change-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "text-primary-foreground bg-[linear-gradient(110deg,var(--primary),var(--secondary))] shadow-soft hover:shadow-clay hover:-translate-y-0.5",
  accent:
    "text-accent-foreground bg-accent shadow-soft hover:shadow-clay hover:-translate-y-0.5",
  outline:
    "border border-border bg-surface/60 text-foreground backdrop-blur hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:bg-surface-muted",
  white:
    "bg-white text-slate-900 shadow-soft hover:shadow-clay hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { variant = "primary", size = "md", className } = opts ?? {};
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}
