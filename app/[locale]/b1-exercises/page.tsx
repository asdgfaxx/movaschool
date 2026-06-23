import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ClipboardCheck, Headphones, Mic, PencilRuler, PenLine } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";

const ICONS = [Headphones, BookOpen, PencilRuler, PenLine, Mic, ClipboardCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.b1.title, description: dict.pages.b1.subtitle };
}

export default async function B1Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const b = dict.pages.b1;

  return (
    <>
      <PageHeader kicker="B1" title={b.title} subtitle={b.subtitle} />
      <Container className="pb-12">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground">{b.intro}</p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {b.topics.map((topic, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={topic.title}>
                <div className="flex h-full gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold">{topic.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{topic.text}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
        <div className="mt-10 flex justify-center">
          <Link href={`/${loc}/courses`} className={buttonClasses({ size: "lg" })}>
            {b.cta}
          </Link>
        </div>
      </Container>
    </>
  );
}
