import type { Metadata } from "next";
import Link from "next/link";
import { FileText, GraduationCap, ArrowRight, Download } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { getIcon } from "@/components/icons/registry";
import { B1DemoQuiz } from "@/components/sections/b1-demo-quiz";

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
      {/* Unique hero with example preview */}
      <section className="relative overflow-hidden border-b border-border bg-surface pb-12 pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <GraduationCap className="h-4 w-4" />
              {b.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-balance sm:text-5xl">{b.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{b.subtitle}</p>
          </Reveal>

          {/* Example preview chip */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-3 shadow-soft">
              <span className="text-sm font-semibold text-muted-foreground">
                {b.exampleLabel}
              </span>
              <span className="text-sm font-bold text-foreground">
                {b.demoExercises[0].question}
              </span>
              <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                {b.demoExercises[0].options[b.demoExercises[0].answer]}
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Intro + topics */}
      <Container className="pb-4 pt-12">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-base text-muted-foreground">{b.intro}</p>
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {b.topics.map((topic) => {
            const Icon = getIcon(topic.icon);
            return (
              <StaggerItem key={topic.title}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay">
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
      </Container>

      {/* Demo exercises */}
      <section className="mt-16">
        <Container width="narrow">
          <Reveal>
            <B1DemoQuiz
              exercises={b.demoExercises}
              title={b.demoTitle}
              subtitle={b.demoSubtitle}
              checkLabel={b.demoCheckLabel}
              correctLabel={b.demoCorrectLabel}
              resetLabel={b.demoResetLabel}
            />
          </Reveal>
        </Container>
      </section>

      {/* Sample materials */}
      <section className="mt-16">
        <Container>
          <SectionHeading title={b.materialsTitle} />
          <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-3">
            {b.materials.map((m) => (
              <StaggerItem key={m.name}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-clay">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold leading-snug">{m.name}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{m.description}</p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    {b.downloadLabel}
                  </button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-14 text-center shadow-clay sm:px-16">
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/8 blur-3xl" />
                <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
              </div>
              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-2xl font-extrabold text-balance sm:text-3xl">{b.cta}</h2>
                <div className="mt-8">
                  <Link
                    href={`/${loc}/courses?level=B1`}
                    className={buttonClasses({ size: "lg" })}
                  >
                    {b.cta}
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
