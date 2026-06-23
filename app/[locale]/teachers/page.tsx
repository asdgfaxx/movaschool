import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TeacherCard } from "@/components/sections/teacher-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.teachers.title, description: dict.pages.teachers.subtitle };
}

export default async function TeachersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const t = dict.pages.teachers;

  return (
    <>
      <PageHeader kicker={dict.nav.teachers} title={t.title} subtitle={t.subtitle} />
      <Container className="pb-12">
        <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {dict.teachers.map((teacher) => (
            <StaggerItem key={teacher.photo}>
              <TeacherCard t={teacher} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </>
  );
}
