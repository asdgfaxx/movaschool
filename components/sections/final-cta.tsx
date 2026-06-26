"use client";

import { Phone, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Counter } from "@/components/motion/counter";
import type { Dictionary } from "@/messages/types";

export function FinalCta({ locale, dict }: { locale: string; dict: Dictionary }) {
  const t = dict.finalCta;
  const phone = dict.contactInfo.phone;
  const telHref = `tel:${phone.replace(/[\s()-]/g, "")}`;

  return (
    <section className="pb-8 pt-12">
      <Container>
        <Reveal>
          <div className="mesh-bg relative overflow-hidden rounded-[2.5rem] border border-border px-8 py-16 text-center shadow-glow sm:px-16">
            {/* Parallax animated blobs */}
            <ParallaxLayer speed={-80} className="pointer-events-none absolute inset-0 -z-10">
              <div className="animate-blob absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
            </ParallaxLayer>
            <ParallaxLayer speed={-120} className="pointer-events-none absolute inset-0 -z-10">
              <div className="animate-blob absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" style={{ animationDelay: "-4s" }} />
            </ParallaxLayer>
            <ParallaxLayer speed={-60} className="pointer-events-none absolute inset-0 -z-10">
              <div className="animate-float absolute left-1/3 top-1/4 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
            </ParallaxLayer>

            <div className="relative mx-auto max-w-2xl">
              {/* Urgency element */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-bold text-destructive">
                <Flame className="h-4 w-4" />
                <Counter value={t.urgencyValue} locale={locale} />
                <span className="font-medium">{t.urgencyText}</span>
              </div>

              <h2 className="text-3xl font-extrabold text-balance text-foreground sm:text-4xl lg:text-5xl">{t.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t.subtitle}</p>

              {/* Click-to-call */}
              <a
                href={telHref}
                className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-primary hover:underline"
              >
                <Phone className="h-5 w-5" />
                {phone}
              </a>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <MagneticButton href={`/${locale}/contact`} variant="primary" size="lg">
                  {t.primary}
                </MagneticButton>
                <MagneticButton href={`/${locale}/level-test`} variant="outline" size="lg">
                  {t.secondary}
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
