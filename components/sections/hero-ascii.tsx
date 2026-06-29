import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Aurora } from "@/components/motion/aurora";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/messages/types";

const BAR_HEIGHTS = [4, 10, 6, 12, 8, 14, 5, 11];

export function HeroAscii({ locale, dict }: { locale: string; dict: Dictionary }) {
  const a = dict.hero.ascii;
  if (!a) return null;
  const inf = a.frameLabel || "∞";

  return (
    <section className="relative min-h-dvh overflow-hidden bg-background pt-28 pb-24 lg:pt-0 lg:pb-0">
      <Aurora className="opacity-30" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-25" aria-hidden />
      <div className="stars-bg absolute inset-0 -z-10 lg:hidden" aria-hidden />

      {/* Top header bar */}
      <div className="absolute inset-x-0 top-0 z-20 border-b border-border bg-surface/60 backdrop-blur-sm">
        <Container className="flex items-center justify-between py-3 lg:py-4">
          <div className="flex items-center gap-2 lg:gap-4">
            <span className="-skew-x-12 font-mono text-xl font-bold italic tracking-widest text-foreground lg:text-2xl">
              MOVA
            </span>
            <span className="h-3 w-px bg-border lg:h-4" />
            <span className="font-mono text-[8px] text-muted-foreground lg:text-[10px]">
              EST. 2013
            </span>
          </div>
          <div className="hidden items-center gap-3 font-mono text-[10px] text-muted-foreground lg:flex">
            <span>LAT: 52.2297°</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>LONG: 21.0122°</span>
          </div>
        </Container>
      </div>

      {/* Corner frame accents */}
      <div className="absolute left-0 top-0 z-20 h-8 w-8 border-t-2 border-l-2 border-foreground/30 lg:h-12 lg:w-12" />
      <div className="absolute right-0 top-0 z-20 h-8 w-8 border-t-2 border-r-2 border-foreground/30 lg:h-12 lg:w-12" />
      <div
        className="absolute bottom-0 left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-foreground/30 lg:h-12 lg:w-12"
        style={{ bottom: "6vh" }}
      />
      <div
        className="absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-foreground/30 lg:h-12 lg:w-12"
        style={{ bottom: "6vh" }}
      />

      {/* CTA content */}
      <div
        className="relative z-10 flex min-h-dvh items-center justify-end lg:pt-0"
        style={{ marginTop: "5vh" }}
      >
        <Container className="w-full px-6 lg:px-16 lg:pr-[10%]">
          <div className="relative ml-auto w-full max-w-lg">
            {/* Top decorative line */}
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <span className="h-px w-8 bg-foreground" />
              <span className="font-mono text-[10px] tracking-wider text-foreground">{inf}</span>
              <span className="h-px flex-1 bg-foreground" />
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="dither-pattern absolute -right-3 top-0 bottom-0 hidden w-1 opacity-30 lg:block" />
              <h1
                className="mb-3 font-mono text-2xl font-bold leading-tight tracking-wider text-foreground lg:-ml-[5%] lg:text-5xl"
                style={{ letterSpacing: "0.1em" }}
              >
                {a.title}{" "}
                <span className="text-primary">{a.titleAccent}</span>
              </h1>
            </div>

            {/* Decorative dots pattern */}
            <div className="mb-3 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <span key={i} className="h-0.5 w-0.5 rounded-full bg-foreground" />
              ))}
            </div>

            {/* Description */}
            <div className="relative">
              <p className="mb-5 font-mono text-xs leading-relaxed text-muted-foreground lg:mb-6 lg:text-base">
                {a.subtitle}
              </p>

              {/* Technical corner accent */}
              <div className="absolute -left-4 top-1/2 hidden h-3 w-3 -translate-y-1/2 border border-foreground opacity-30 lg:block">
                <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 bg-foreground" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              <a
                href={`/${locale}/contact`}
                className="group relative px-5 py-2 font-mono text-xs text-foreground outline outline-1 outline-foreground hover:bg-foreground hover:text-background lg:px-6 lg:py-2.5 lg:text-sm"
              >
                <span className="absolute -left-1 -top-1 hidden h-2 w-2 border-l border-t border-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                <span className="absolute -bottom-1 -right-1 hidden h-2 w-2 border-b border-r border-foreground opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                {a.ctaPrimary}
                <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
              </a>

              <a
                href={`/${locale}/level-test`}
                className="group relative px-5 py-2 font-mono text-xs text-foreground outline outline-1 outline-foreground hover:bg-foreground hover:text-background lg:px-6 lg:py-2.5 lg:text-sm"
              >
                <PlayCircle className="mr-1 inline h-3.5 w-3.5" />
                {a.ctaSecondary}
              </a>
            </div>

            {/* Bottom technical notation */}
            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="font-mono text-[9px] text-foreground">{inf}</span>
              <span className="h-px flex-1 bg-foreground" />
              <span className="font-mono text-[9px] text-foreground">{a.protocolLabel}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom footer */}
      <div
        className="absolute inset-x-0 z-20 border-t border-border bg-surface/60 backdrop-blur-sm"
        style={{ bottom: "6vh" }}
      >
        <Container className="flex items-center justify-between py-2 lg:py-3">
          <div className="flex items-center gap-3 font-mono text-[8px] text-muted-foreground lg:gap-6 lg:text-[9px]">
            <span className="hidden lg:inline">{a.systemLabel}</span>
            <span className="lg:hidden">SYS</span>
            <span className="hidden gap-1 lg:flex">
              {BAR_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-foreground/30"
                  style={{ height: `${h}px` }}
                />
              ))}
            </span>
            <span>{a.versionLabel}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[8px] text-muted-foreground lg:gap-4 lg:text-[9px]">
            <span className="hidden lg:inline">{a.renderingLabel}</span>
            <span className="flex gap-1">
              <span className="h-1 w-1 animate-pulse rounded-full bg-foreground/60" />
              <span
                className="h-1 w-1 animate-pulse rounded-full bg-foreground/40"
                style={{ animationDelay: "0.2s" }}
              />
              <span
                className="h-1 w-1 animate-pulse rounded-full bg-foreground/20"
                style={{ animationDelay: "0.4s" }}
              />
            </span>
            <span className="hidden lg:inline">FRAME: {inf}</span>
          </div>
        </Container>
      </div>
    </section>
  );
}
