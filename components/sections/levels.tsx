import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { buttonClasses } from "@/components/ui/button";
import type { Dictionary } from "@/messages/types";

const HUES = ["#2563eb", "#6366f1", "#0ea5e9", "#059669", "#f97316"];

export function Levels({ locale, dict }: { locale: string; dict: Dictionary }) {
  const { levels } = dict;
  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading kicker={levels.kicker} title={levels.title} subtitle={levels.subtitle} />
        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {levels.items.map((lvl, i) => (
            <StaggerItem key={lvl.code}>
              <div className="group flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-base font-extrabold text-white shadow-soft"
                  style={{ background: `linear-gradient(135deg, ${HUES[i]}, ${HUES[(i + 1) % HUES.length]})` }}
                >
                  {lvl.code}
                </span>
                <h3 className="text-base font-bold leading-snug">{lvl.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{lvl.blurb}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-10 flex justify-center">
          <Link href={`/${locale}/courses`} className={buttonClasses({ variant: "outline", size: "lg" })}>
            {levels.cta}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
