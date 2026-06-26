import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * MOVASchool logo: an SVG mark of four brand dots + wordmark.
 * The wordmark's "chool" uses currentColor so it adapts to light/dark;
 * the colored mark stays on-brand. Hover adds a soft glow.
 */
export function Logo({ locale, className }: { locale: string; className?: string }) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="MOVASchool"
      className={cn(
        "group inline-flex items-center gap-2 transition-[filter] duration-300 hover:[filter:drop-shadow(0_4px_12px_color-mix(in_oklab,var(--primary)_40%,transparent))]",
        className,
      )}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        className="transition-transform duration-300 group-hover:rotate-12"
        aria-hidden
      >
        <circle cx="6" cy="6" r="4" fill="var(--accent)" />
        <circle cx="16" cy="6" r="4" fill="var(--secondary)" />
        <circle cx="6" cy="16" r="4" fill="var(--destructive)" />
        <circle cx="16" cy="16" r="4" fill="var(--copper)" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="bg-[linear-gradient(110deg,var(--destructive),var(--copper))] bg-clip-text text-transparent">
          MOVAS
        </span>
        <span className="text-foreground">chool</span>
      </span>
    </Link>
  );
}
