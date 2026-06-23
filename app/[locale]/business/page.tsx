import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BarChart3,
  Briefcase,
  CalendarClock,
  Check,
  Globe,
  Headset,
  Receipt,
} from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BENEFIT_ICONS = [Receipt, BarChart3, Briefcase, CalendarClock, Globe, Headset];

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
      <PageHeader kicker={dict.nav.business} title={b.title} subtitle={b.subtitle} />

      <Container>
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground">{b.intro}</p>
        </Reveal>
      </Container>

      {/* Benefits */}
      <Container className="mt-12">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {b.benefits.map((item, i) => {
            const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
            return (
              <StaggerItem key={item.title}>
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>

      {/* Stats */}
      <Container className="mt-16">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 rounded-[2rem] border border-border bg-surface p-8 shadow-soft sm:grid-cols-3 md:p-10">
            {b.stats.map((s) => (
              <div key={s.label} className="text-center">
                <Counter value={s.value} className="text-gradient block text-4xl font-extrabold sm:text-5xl" />
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
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
                    pkg.highlighted ? "border-primary ring-2 ring-primary/30" : "border-border",
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
                  <ul className="flex flex-1 flex-col gap-2.5">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${loc}/contact`}
                    className={buttonClasses({
                      variant: pkg.highlighted ? "primary" : "outline",
                      size: "md",
                      className: "w-full",
                    })}
                  >
                    {b.packageCta}
                  </Link>
                </div>
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
            <div
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
              aria-hidden
            />
            <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {b.process.map((step, i) => (
                <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-xl font-extrabold text-primary-foreground shadow-clay">
                    {i + 1}
                  </div>
                  <h3 className="font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(130deg,var(--primary),var(--secondary))] px-8 py-16 text-center shadow-clay sm:px-16">
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" aria-hidden />
              <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden />
              <div className="relative mx-auto max-w-2xl text-primary-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
                  <BadgeCheck className="h-4 w-4" /> B2B
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-balance sm:text-4xl">{b.ctaTitle}</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{b.ctaText}</p>
                <Link
                  href={`/${loc}/contact`}
                  className={buttonClasses({ variant: "white", size: "lg", className: "mt-8" })}
                >
                  {b.ctaButton}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
