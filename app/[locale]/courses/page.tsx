import type { Metadata } from "next";
import Link from "next/link";
import { CalendarRange, Clock } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { buttonClasses } from "@/components/ui/button";

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

      <div className="flex flex-col gap-16 pb-12">
        {c.groups.map((group) => (
          <section key={group.id}>
            <Container>
              <SectionHeading align="left" title={group.title} subtitle={group.blurb} />
              <StaggerGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.courses.map((course) => (
                  <StaggerItem key={course.name}>
                    <div className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {course.level}
                        </span>
                        <span className="text-sm font-bold text-accent">{course.price}</span>
                      </div>
                      <h3 className="text-lg font-bold">{course.name}</h3>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 shrink-0 text-primary" /> {course.freq}
                        </li>
                        <li className="flex items-center gap-2">
                          <CalendarRange className="h-4 w-4 shrink-0 text-primary" /> {course.duration}
                        </li>
                      </ul>
                      <Link
                        href={`/${loc}/contact`}
                        className={buttonClasses({ variant: "outline", size: "sm", className: "mt-auto w-full" })}
                      >
                        {c.cta}
                      </Link>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Container>
          </section>
        ))}
      </div>
    </>
  );
}
