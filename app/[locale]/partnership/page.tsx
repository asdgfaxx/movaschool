import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { getIcon } from "@/components/icons/registry";
import { CommissionCalculator } from "@/components/sections/commission-calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.partnership.title, description: dict.pages.partnership.subtitle };
}

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const p = dict.pages.partnership;

  return (
    <>
      {/* Premium hero with gold-accent aurora */}
      <section className="relative overflow-hidden border-b border-border bg-surface pb-12 pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/8 blur-3xl" />
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <Handshake className="h-4 w-4" />
              {p.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-balance sm:text-5xl">{p.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{p.subtitle}</p>
          </Reveal>
        </Container>
      </section>

      {/* Intro glass panel */}
      <Container className="pb-4">
        <Reveal>
          <div className="glass-strong mx-auto max-w-3xl rounded-[2rem] p-8 text-center shadow-float">
            <p className="text-base text-muted-foreground">{p.intro}</p>
          </div>
        </Reveal>
      </Container>

      {/* Perks bento-grid */}
      <Container className="mt-12">
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.perks.map((perk) => {
            const Icon = getIcon(perk.icon);
            return (
              <StaggerItem key={perk.title}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{perk.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{perk.text}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>

      {/* Commission calculator */}
      <section className="mt-20">
        <Container width="narrow">
          <Reveal>
            <CommissionCalculator dict={dict} locale={loc} />
          </Reveal>
        </Container>
      </section>

      {/* Partners */}
      <section className="mt-20">
        <Container>
          <SectionHeading title={p.partnersTitle} />
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {p.partners.map((partner) => (
              <StaggerItem key={partner.name}>
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-clay">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--gold))] text-sm font-extrabold text-primary-foreground shadow-soft">
                    {partner.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="text-sm font-semibold">{partner.name}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-16 text-center shadow-clay sm:px-16">
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold/8 blur-3xl" />
                <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
              </div>
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-3xl font-extrabold text-balance text-foreground sm:text-4xl">{p.cta}</h2>
                <div className="mt-8">
                  <Link
                    href={`/${loc}/contact?type=partnership`}
                    className={buttonClasses({ size: "lg" })}
                  >
                    {p.ctaButton}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
