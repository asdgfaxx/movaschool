import { cn } from "@/lib/utils";

type Pattern = "dots" | "waves" | "grid" | "circles";

const PATTERNS: Pattern[] = ["dots", "waves", "grid", "circles"];

/** Deterministically pick a pattern from the slug so each post has a stable cover. */
function pickPattern(slug: string): Pattern {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return PATTERNS[Math.abs(hash) % PATTERNS.length];
}

function PatternLayer({ pattern }: { pattern: Pattern }) {
  switch (pattern) {
    case "waves":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none" aria-hidden>
          <defs>
            <pattern id="wave" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 10 Q10 0 20 10 T40 10" stroke="white" strokeWidth="1.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave)" />
        </svg>
      );
    case "grid":
      return (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden
        />
      );
    case "circles":
      return (
        <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none" aria-hidden>
          <defs>
            <pattern id="circles" width="44" height="44" patternUnits="userSpaceOnUse">
              <circle cx="22" cy="22" r="3" fill="white" />
              <circle cx="0" cy="0" r="3" fill="white" />
              <circle cx="44" cy="44" r="3" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circles)" />
        </svg>
      );
    default: // dots
      return (
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,.6) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
          aria-hidden
        />
      );
  }
}

export function BlogCover({
  from,
  to,
  className,
  children,
  slug,
}: {
  from: string;
  to: string;
  className?: string;
  children?: React.ReactNode;
  slug?: string;
}) {
  const pattern = slug ? pickPattern(slug) : "dots";
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <PatternLayer pattern={pattern} />
      <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/20 blur-2xl" aria-hidden />
      <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full bg-black/10 blur-2xl" aria-hidden />
      {children}
    </div>
  );
}
