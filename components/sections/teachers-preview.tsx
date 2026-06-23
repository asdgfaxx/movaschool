import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TeacherCard } from "./teacher-card";
import { buttonClasses } from "@/components/ui/button";
import type { Dictionary } from "@/messages/types";

export function TeachersPreview({ locale, dict }: { locale: string; dict: Dictionary }) {
  const { teachersPreview, teachers } = dict;
  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading
          kicker={teachersPreview.kicker}
          title={teachersPreview.title}
          subtitle={teachersPreview.subtitle}
        />
        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {teachers.map((t) => (
            <StaggerItem key={t.photo}>
              <TeacherCard t={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-10 flex justify-center">
          <Link href={`/${locale}/teachers`} className={buttonClasses({ variant: "outline", size: "lg" })}>
            {teachersPreview.cta}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
