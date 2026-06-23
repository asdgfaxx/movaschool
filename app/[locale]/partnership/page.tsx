import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Handshake, Megaphone } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";

const ICONS = [Handshake, Building2, Megaphone];

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
      <PageHeader kicker={dict.nav.contact} title={p.title} subtitle={p.subtitle} />
      <Container className="pb-12">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground">{p.intro}</p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {p.perks.map((perk, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={perk.title}>
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-bold">{perk.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{perk.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
        <div className="mt-10 flex justify-center">
          <Link href={`/${loc}/contact`} className={buttonClasses({ size: "lg" })}>
            {p.cta}
          </Link>
        </div>
      </Container>
    </>
  );
}
