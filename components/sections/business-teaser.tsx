"use client";

import { ArrowRight, Building2, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { buttonClasses } from "@/components/ui/button";
import type { Dictionary } from "@/messages/types";

export function BusinessTeaser({ locale, dict }: { locale: string; dict: Dictionary }) {
  const b = dict.pages.business.home;

  const stats = b.stats;

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-20">
      {/* Subtle gradient accent — not glass */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Building2 className="h-3.5 w-3.5" />
                {b.kicker}
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
                {b.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                {b.text}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-2">
                {b.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm font-medium">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/12">
                      <Check className="h-3 w-3 text-accent" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <a href={`/${locale}/business`} className={buttonClasses({ size: "lg", className: "mt-2 w-fit" })}>
                {b.button}
                <ArrowRight className="h-5 w-5" />
              </a>
            </Reveal>
          </div>

          {/* Right — metrics dashboard */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft sm:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {b.resultsLabel}
                  </p>
                  <p className="mt-0.5 text-sm font-bold">{dict.pages.business.processTitle}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  VAT
                </span>
              </div>

              {/* Metric grid */}
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {stats.map((s) => (
                  <div key={s.label} className="bg-background p-5">
                    <Counter
                      value={s.value}
                      locale={locale}
                      className="block text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl"
                    />
                    <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Industry breakdown — clean, no plastic bars */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {b.byIndustryLabel}
                </p>
                <div className="flex flex-col gap-3">
                  {b.progress.map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <span className="w-28 shrink-0 text-xs font-semibold text-foreground">{row.label}</span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-muted">
                        <div
                          className="h-full rounded-full bg-foreground/70"
                          style={{ width: `${row.value}%` }}
                        />
                      </div>
                      <span className="w-9 shrink-0 text-right text-xs font-bold tabular-nums text-muted-foreground">
                        {row.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
