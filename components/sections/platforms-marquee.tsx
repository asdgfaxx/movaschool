import { Marquee } from "@/components/motion/marquee";
import type { Dictionary } from "@/messages/types";

const PLATFORMS = [
  { name: "Google", rating: "4.9" },
  { name: "Trustpilot", rating: "4.8" },
  { name: "Facebook", rating: "5.0" },
];

export function PlatformsMarquee({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-border bg-surface/50 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:flex-row sm:gap-8">
        <p className="shrink-0 text-sm font-semibold text-muted-foreground">
          {dict.hero.platformsLabel}
        </p>
        <Marquee speed={30} pauseOnHover gapClassName="gap-10" className="opacity-80">
          {PLATFORMS.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-foreground">{p.name}</span>
              <span className="text-xs font-semibold text-amber-500">★ {p.rating}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
