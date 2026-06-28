"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getIcon } from "@/components/icons/registry";
import type { Dictionary } from "@/messages/types";

export function Steps({ dict }: { dict: Dictionary }) {
  const { steps } = dict;
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading kicker={steps.kicker} title={steps.title} subtitle={steps.subtitle} />

        <div className="relative mx-auto mt-14 max-w-2xl">
          {/* Vertical connector line with fill animation */}
          <div className="absolute bottom-0 left-6 top-0 w-px bg-border lg:left-1/2">
            <motion.div
              className="h-full w-full bg-primary"
              initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={reduce ? { duration: 0 } : { duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {steps.items.map((step, i) => {
              const Icon = getIcon(step.icon);
              const isEven = i % 2 === 0;

              return (
                <Reveal key={step.title} delay={i * 0.1} className="relative">
                  <div className={`flex items-start gap-6 lg:gap-0 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    {/* Card */}
                    <div className="flex-1 lg:px-8">
                      <div className={`rounded-2xl border border-border bg-surface p-6 shadow-soft ${isEven ? "lg:text-right" : ""}`}>
                        <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ${isEven ? "lg:ml-auto" : ""}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                      </div>
                    </div>

                    {/* Center number node (desktop) */}
                    <div className="relative z-10 hidden shrink-0 lg:block lg:w-0">
                      <div className="absolute left-1/2 top-6 -translate-x-1/2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-clay ring-4 ring-surface-muted">
                          {i + 1}
                        </div>
                      </div>
                    </div>

                    {/* Mobile number badge */}
                    <div className="z-10 shrink-0 lg:hidden">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base font-extrabold text-primary-foreground shadow-clay ring-4 ring-surface-muted">
                        {i + 1}
                      </div>
                    </div>

                    {/* Large background number (desktop) */}
                    <div className="hidden lg:block lg:w-1/2">
                      <span
                        className={`block select-none text-[7rem] font-extrabold leading-none text-primary/5 ${isEven ? "text-right" : ""}`}
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
