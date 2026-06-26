import { cn } from "@/lib/utils";

/** Gradient decorative divider. */
export function Divider({
  className,
  vertical = false,
}: {
  className?: string;
  vertical?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-[linear-gradient(90deg,transparent,var(--primary),var(--secondary),var(--accent),transparent)]",
        vertical ? "block h-full w-px" : "block h-px w-full",
        className,
      )}
    />
  );
}
