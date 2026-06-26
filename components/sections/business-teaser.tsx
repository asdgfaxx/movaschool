"use client";

import { ArrowRight, BadgeCheck, Building2, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Counter } from "@/components/motion/counter";
import type { Dictionary } from "@/messages/types";

export function BusinessTeaser({ locale, dict }: { locale: string; dict: Dictionary }) {
  const b = dict.pages.business.home;
  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] glass-strong p-8 shadow-glow lg:grid-cols-2 lg:p-12">
            {/* Parallax background glow */}
            <ParallaxLayer speed={-50} className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            </ParallaxLayer>

            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <Building2 className="h-4 w-4" />
                {b.kicker}
              </span>
              <h2 className="text-3xl font-extrabold leading-tight text-balance sm:text-4xl">{b.title}</h2>
              <p className="max-w-md text-base text-muted-foreground sm:text-lg">{b.text}</p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {b.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium">
                    <Check className="h-4 w-4 shrink-0 text-accent" /> {p}
                  </li>
                ))}
              </ul>
              <MagneticButton href={`/${locale}/business`} size="lg" className="mt-1 w-fit">
                {b.button}
                <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </div>

            <div className="relative">
              <div className="rounded-[1.75rem] border border-border bg-background/80 p-6 shadow-clay backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{dict.pages.business.processTitle}</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                    <BadgeCheck className="h-3.5 w-3.5" /> VAT
                  </span>
                </div>
                <div className="mt-5 flex flex-col gap-4">
                  {b.progress.map((row) => (
                    <div key={row.label}>
                      <div className="mb-1 flex justify-between text-xs font-semibold text-muted-foreground">
                        <span>{row.label}</span>
                        <Counter value={`${row.value}%`} locale={locale} />
                      </div>
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
                        <div
                          className="animate-gradient-pan h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--secondary),var(--primary))] bg-[length:200%_100%]"
                          style={{ width: `${row.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
