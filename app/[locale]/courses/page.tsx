import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { CoursesExplorer } from "@/components/sections/courses-explorer";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Reveal } from "@/components/motion/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.courses.title, description: dict.pages.courses.subtitle };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const c = dict.pages.courses;

  return (
    <>
      <PageHeader kicker={dict.nav.courses} title={c.title} subtitle={c.subtitle} />

      {/* Quick level chips */}
      <Container className="pb-4">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["A1", "A2", "B1", "B2", "C1"].map((lvl) => (
              <a
                key={lvl}
                href={`#courses`}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-bold text-primary transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
              >
                {lvl}
              </a>
            ))}
          </div>
        </Reveal>
      </Container>

      <div id="courses" className="pt-4">
        <CoursesExplorer locale={loc} dict={dict} />
      </div>

      {/* CTA panel */}
      <Container className="pb-16">
        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-surface-muted p-8 text-center">
            <h2 className="text-xl font-bold">
              {loc === "ru" ? "Не нашли свой курс?" : "Nie znalazłeś swojego kursu?"}
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              {loc === "ru"
                ? "Напишите нам — подберём курс под ваши цели и уровень."
                : "Napisz do nas — dobierzemy kurs pod Twoje cele i poziom."}
            </p>
            <MagneticButton href={`/${loc}/contact`} size="lg">
              {c.notFoundCta}
            </MagneticButton>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
