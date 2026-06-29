import Image from "next/image";
import { Check, GraduationCap, PlayCircle, Sparkles, ChevronDown } from "lucide-react";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/messages/types";

export function Hero({ locale, dict }: { locale: string; dict: Dictionary }) {
  const h = dict.hero;
  const teacher =
    dict.teachers.find((t) => t.id === h.teacherId) ?? dict.teachers[1] ?? dict.teachers[0];

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <Aurora className="opacity-40" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" aria-hidden />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-semibold text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                {h.badge}
              </span>
            </Reveal>

            <Reveal delay={0.05} as="h1" className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {h.title}{" "}
              <span className="text-primary">{h.titleAccent}</span>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg text-muted-foreground">{h.subtitle}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={`/${locale}/contact`} className={buttonClasses({ size: "lg" })}>
                  {h.ctaPrimary}
                </a>
                <a
                  href={`/${locale}/level-test`}
                  className={buttonClasses({ variant: "outline", size: "lg" })}
                >
                  <PlayCircle className="h-5 w-5" />
                  {h.ctaSecondary}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-accent" />
                {h.note}
              </p>
            </Reveal>
          </div>

          {/* Visual — meeting mockup */}
          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto w-full max-w-md rounded-[1.5rem] border border-border bg-surface p-6 shadow-clay">
              {/* Window chrome */}
              <div className="mb-5 flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-destructive" />
                <span className="h-3 w-3 rounded-full bg-warning" />
                <span className="h-3 w-3 rounded-full bg-success" />
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {h.meetLabel}
                </span>
              </div>

              {/* Teacher video tile */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-surface-muted">
                <Image
                  src={teacher.photo}
                  alt={teacher.name}
                  width={400}
                  height={220}
                  className="h-44 w-full object-cover sm:h-48"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),transparent_55%)]" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                  <div className="min-w-0 text-white">
                    <p className="truncate text-sm font-bold drop-shadow">{teacher.name}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/90">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                      </span>
                      {h.onlineLabel}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-primary shadow">
                    {h.levelRange}
                  </span>
                </div>
              </div>

              {/* Lesson progress */}
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                  <span>{h.lessonProgressLabel}</span>
                  <span>12:34 / 45:00</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full w-1/3 rounded-full bg-primary" />
                </div>
              </div>

              {/* Bar chart */}
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-semibold text-muted-foreground">
                  {h.activityLabel}
                </p>
                <div className="flex h-12 items-end gap-1" aria-hidden>
                  {[10, 22, 14, 30, 18, 26, 12, 28, 16, 24, 11, 20].map((bar, i) => (
                    <span
                      key={i}
                      className="animate-float w-full rounded-full bg-primary/70"
                      style={{ height: bar, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>

              {/* Stat tiles */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {h.floatingCards.map((card) => (
                  <span
                    key={card}
                    className="rounded-lg border border-border bg-surface px-2 py-2.5 text-center text-[11px] font-semibold leading-tight text-foreground"
                  >
                    {card}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating chips with Counter */}
            <div className="animate-float absolute -left-6 top-10 hidden rounded-xl border border-border bg-surface px-3 py-2 shadow-clay sm:flex sm:items-center sm:gap-2">
              <GraduationCap className="h-5 w-5 text-accent" />
              <Counter value={h.floatingChips[0]} locale={locale} className="text-xs font-bold" />
            </div>
            <div
              className="animate-float absolute -right-4 bottom-12 hidden rounded-xl border border-border bg-surface px-3 py-2 shadow-clay sm:block"
              style={{ animationDelay: "-3s" }}
            >
              <span className="text-xs font-bold text-primary">{h.floatingChips[1]}</span>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block">
        <ChevronDown className="h-5 w-5 animate-float text-muted-foreground" />
      </div>
    </section>
  );
}
