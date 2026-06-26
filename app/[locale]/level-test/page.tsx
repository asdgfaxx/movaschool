import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { LevelQuiz } from "@/components/sections/level-quiz";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.levelTest.title, description: dict.pages.levelTest.subtitle };
}

export default async function LevelTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);

  return (
    <>
      <PageHeader kicker={dict.nav.levelTest} title={dict.pages.levelTest.title} />
      <LevelQuiz data={dict.pages.levelTest} locale={loc} dict={dict} />
    </>
  );
}
