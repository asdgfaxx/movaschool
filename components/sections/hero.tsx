import Link from "next/link";
import Image from "next/image";
import { Check, GraduationCap, PlayCircle, Sparkles } from "lucide-react";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

export function Hero({ locale, dict }: { locale: string; dict: Dictionary }) {
  const h = dict.hero;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
      <Aurora />
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-1.5 text-sm font-semibold text-muted-foreground backdrop-blur">
                <Sparkles className="h-4 w-4 text-primary" />
                {h.badge}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                {h.title}{" "}
                <span className="text-gradient">{h.titleAccent}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-lg text-muted-foreground">{h.subtitle}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className={buttonClasses({ size: "lg" })}>
                  {h.ctaPrimary}
                </Link>
                <Link
                  href={`/${locale}/level-test`}
                  className={buttonClasses({ variant: "outline", size: "lg" })}
                >
                  <PlayCircle className="h-5 w-5" />
                  {h.ctaSecondary}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-accent" />
                {h.note}
              </p>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.15} className="relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[linear-gradient(140deg,var(--primary),var(--secondary),var(--accent))] opacity-20 blur-2xl" />

              <div className="rounded-[2rem] border border-border bg-surface/90 p-5 shadow-clay backdrop-blur">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                  <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                  <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
                  <span className="ml-auto text-xs font-semibold text-muted-foreground">
                    Google Meet
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-surface-muted p-3">
                  <Image
                    src="/teachers/t2.png"
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-background"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{dict.teachers[1].name}</p>
                    <p className="inline-flex items-center gap-1.5 text-xs text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" /> online
                    </p>
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    A1 → B1
                  </span>
                </div>

                <div className="mt-4 flex items-end gap-1" aria-hidden>
                  {[10, 22, 14, 30, 18, 26, 12, 28, 16, 24, 11, 20].map((bar, i) => (
                    <span
                      key={i}
                      className="animate-float w-full rounded-full bg-[linear-gradient(to_top,var(--primary),var(--secondary))]"
                      style={{ height: bar, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {dict.hero.floatingCards.map((card) => (
                    <span
                      key={card}
                      className="rounded-xl bg-surface-muted px-2 py-2 text-center text-[11px] font-semibold leading-tight text-muted-foreground"
                    >
                      {card}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating chips */}
              <div className="animate-float absolute -left-6 top-10 hidden rounded-2xl border border-border bg-surface px-3 py-2 shadow-clay sm:flex sm:items-center sm:gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                <span className="text-xs font-bold">+200 / {locale === "ru" ? "мес" : "mies"}.</span>
              </div>
              <div
                className="animate-float absolute -right-4 bottom-12 hidden rounded-2xl border border-border bg-surface px-3 py-2 shadow-clay sm:block"
                style={{ animationDelay: "-3s" }}
              >
                <span className="text-xs font-bold text-primary">B1 · 90/100</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
