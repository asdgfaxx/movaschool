import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Check, ArrowRight } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatTile } from "@/components/ui/stat-tile";
import { Accordion } from "@/components/ui/accordion";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { getIcon } from "@/components/icons/registry";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.business.title, description: dict.pages.business.subtitle };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const b = dict.pages.business;

  return (
    <>
      {/* Premium hero with gold aurora */}
      <section className="mesh-bg relative overflow-hidden pb-12 pt-32 lg:pt-40">
        <ParallaxLayer speed={-60} className="pointer-events-none absolute inset-0 -z-10">
          <div className="animate-aurora absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="animate-float absolute -right-10 top-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        </ParallaxLayer>
        <Container className="relative text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <BadgeCheck className="h-4 w-4" />
              {b.badge}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-balance sm:text-5xl">{b.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{b.subtitle}</p>
          </Reveal>
        </Container>
      </section>

      {/* Intro glass panel */}
      <Container className="pb-4">
        <Reveal>
          <div className="glass-strong mx-auto max-w-3xl rounded-[2rem] p-8 text-center shadow-float">
            <p className="text-base text-muted-foreground">{b.intro}</p>
          </div>
        </Reveal>
      </Container>

      {/* Benefits bento-grid */}
      <Container className="mt-12">
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {b.benefits.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <StaggerItem key={item.title}>
                <SpotlightCard className="flex h-full gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>

      {/* Stats on StatTile */}
      <Container className="mt-16">
        <Reveal>
          <div className="glass-strong grid grid-cols-1 gap-4 rounded-[2rem] p-6 shadow-float sm:grid-cols-3 md:p-8">
            {b.stats.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <StatTile
                  key={s.label}
                  icon={Icon}
                  value={s.value}
                  label={s.label}
                  locale={loc}
                  className="border-0 bg-transparent shadow-none backdrop-blur-none"
                />
              );
            })}
          </div>
        </Reveal>
      </Container>

      {/* Packages */}
      <section className="mt-20">
        <Container>
          <SectionHeading title={b.packagesTitle} />
          <StaggerGroup className="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
            {b.packages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <div
                  className={cn(
                    "relative flex h-full flex-col gap-5 rounded-3xl border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay",
                    pkg.highlighted ? "border-primary ring-2 ring-primary/30 shadow-clay" : "border-border",
                  )}
                >
                  {pkg.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(110deg,var(--primary),var(--secondary))] px-3 py-1 text-xs font-bold text-primary-foreground shadow-soft">
                      {pkg.badge}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-extrabold">{pkg.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>
                  </div>
                  <p className="text-2xl font-extrabold text-primary">{pkg.price}</p>
                  <ul className="flex flex-1 flex-col gap-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${loc}/contact?type=business`}
                    className={cn(
                      "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
                      pkg.highlighted
                        ? "bg-[linear-gradient(110deg,var(--primary),var(--secondary))] text-primary-foreground shadow-soft hover:shadow-clay"
                        : "border border-border bg-surface text-foreground hover:border-primary hover:text-primary",
                    )}
                  >
                    {b.packageCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Cases */}
      <section className="mt-20">
        <Container>
          <SectionHeading title={b.casesTitle} />
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {b.cases.map((c) => (
              <StaggerItem key={c.title}>
                <SpotlightCard className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface p-6 shadow-soft">
                  <h3 className="font-bold">{c.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                  <div className="rounded-2xl bg-accent/10 px-4 py-2 text-sm font-bold text-accent">
                    {c.result}
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* Process */}
      <section className="mt-20">
        <Container>
          <SectionHeading title={b.processTitle} />
          <div className="relative mt-12">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" aria-hidden />
            <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {b.process.map((step, i) => {
                const Icon = getIcon(step.icon);
                return (
                  <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--gold))] text-xl font-extrabold text-primary-foreground shadow-clay">
                      {i + 1}
                    </div>
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <Container width="narrow">
          <SectionHeading title={b.faqTitle} />
          <div className="mt-8">
            <Accordion items={b.faq} defaultOpen={0} />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="mesh-bg relative overflow-hidden rounded-[2.5rem] border border-border px-8 py-16 text-center shadow-glow sm:px-16">
              <ParallaxLayer speed={-80} className="pointer-events-none absolute inset-0 -z-10">
                <div className="animate-blob absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
              </ParallaxLayer>
              <div className="relative mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold">
                  <BadgeCheck className="h-4 w-4" /> {b.badge}
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-balance text-foreground sm:text-4xl">{b.ctaTitle}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{b.ctaText}</p>
                <div className="mt-8">
                  <MagneticButton href={`/${loc}/contact?type=business`} size="lg">
                    {b.ctaButton}
                  </MagneticButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
