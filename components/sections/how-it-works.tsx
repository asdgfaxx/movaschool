"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getIcon } from "@/components/icons/registry";
import type { Dictionary } from "@/messages/types";

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const { how } = dict;
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={how.kicker} title={how.title} subtitle={how.subtitle} />

        <div className="relative mt-12">
          {/* Connector line (desktop) */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-border lg:block">
            <motion.div
              className="h-full bg-primary"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={reduce ? { duration: 0 } : { duration: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Connector line (mobile vertical) */}
          <div className="absolute bottom-0 left-6 top-14 w-px bg-border lg:hidden">
            <motion.div
              className="h-full w-full bg-primary"
              initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={reduce ? { duration: 0 } : { duration: 1.2, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {how.items.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.title} delay={i * 0.05} className="lg:pl-0 pl-12">
                  <div className="group h-full rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-4 ring-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-3xl font-extrabold text-primary/15">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
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
