import { type LucideIcon } from "lucide-react";
import { Counter } from "@/components/motion/counter";
import { cn } from "@/lib/utils";

export function StatTile({
  icon: Icon,
  value,
  label,
  trend,
  locale,
  className,
}: {
  icon: LucideIcon;
  /** Numeric value, may include prefix/suffix and decimals (e.g. "4.9", "+200"). */
  value: string;
  label: string;
  /** Optional trend arrow text, e.g. "↑ 12%". */
  trend?: string;
  locale?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/70 p-5 shadow-soft backdrop-blur",
        className,
      )}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-extrabold tracking-tight text-foreground">
        <Counter value={value} locale={locale} />
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
      {trend && (
        <div className="mt-2 text-xs font-semibold text-accent">{trend}</div>
      )}
    </div>
  );
}
