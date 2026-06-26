"use client";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { TiltCard } from "@/components/motion/tilt-card";
import { getIcon } from "@/components/icons/registry";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { why } = dict;

  const spans = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-3",
  ];

  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={why.kicker} title={why.title} subtitle={why.subtitle} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            const isFeatured = i === 0;
            const isWide = i === 5;

            return (
              <Reveal key={item.title} delay={i * 0.05} className={cn(spans[i])}>
                {isFeatured ? (
                  <TiltCard className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-soft transition-shadow duration-300 hover:shadow-glow">
                    {/* Decorative pattern */}
                    <div className="bg-grid absolute inset-0 -z-10 opacity-40" aria-hidden />
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-20" />

                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-primary-foreground shadow-soft">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </TiltCard>
                ) : (
                  <SpotlightCard
                    className={cn(
                      "group flex h-full gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay",
                      isWide && "flex-row items-center",
                    )}
                  >
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </SpotlightCard>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
