import Image from "next/image";
import { Marquee } from "@/components/motion/marquee";
import type { Dictionary } from "@/messages/types";

const PLATFORMS = [
  { src: "/platforms/platforms-1.png", alt: "Google" },
  { src: "/platforms/platforms-2.png", alt: "Trustpilot" },
  { src: "/platforms/platforms-3.png", alt: "Facebook" },
  { src: "/platforms/platforms-1.png", alt: "Google" },
  { src: "/platforms/platforms-2.png", alt: "Trustpilot" },
  { src: "/platforms/platforms-3.png", alt: "Facebook" },
];

export function PlatformsMarquee({ dict }: { dict: Dictionary }) {
  return (
    <section className="border-y border-border bg-surface/50 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:flex-row sm:gap-8">
        <p className="shrink-0 text-sm font-semibold text-muted-foreground">
          {dict.hero.platformsLabel}
        </p>
        <Marquee speed={30} pauseOnHover gapClassName="gap-10" className="opacity-70">
          {PLATFORMS.map((p, i) => (
            <Image
              key={i}
              src={p.src}
              alt={p.alt}
              width={120}
              height={40}
              className="h-7 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
