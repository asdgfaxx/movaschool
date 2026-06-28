"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import type { Dictionary } from "@/messages/types";

const PREVIEW_COUNT = 4;

export function TeachersPreview({ locale, dict }: { locale: string; dict: Dictionary }) {
  const { teachersPreview, teachers } = dict;
  const featured = teachers.slice(0, PREVIEW_COUNT);

  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading
          kicker={teachersPreview.kicker}
          title={teachersPreview.title}
          subtitle={teachersPreview.subtitle}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((t, i) => (
            <Reveal key={t.id ?? t.photo} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-6 text-center shadow-soft transition-shadow duration-300 hover:shadow-clay">
                {/* Avatar with gradient ring */}
                <div className="relative mx-auto w-fit">
                  <div className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))] opacity-0 blur transition-opacity duration-300 group-hover:opacity-70" />
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="relative h-24 w-24 rounded-full object-cover ring-4 ring-surface sm:h-28 sm:w-28"
                  />
                </div>

                <div className="mt-3">
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {t.experience}
                  </p>

                  {/* Expandable details on hover */}
                  <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100">
                    {t.levels && (
                      <div className="mb-2 flex flex-wrap justify-center gap-1">
                        {t.levels.map((lvl) => (
                          <Pill key={lvl} tone="primary">{lvl}</Pill>
                        ))}
                      </div>
                    )}
                    {t.specialties && (
                      <div className="flex flex-wrap justify-center gap-1">
                        {t.specialties.map((sp) => (
                          <span key={sp} className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {sp}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/${locale}/contact?teacher=${t.id ?? ""}`}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      {teachersPreview.cta}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href={`/${locale}/teachers`} className={buttonClasses({ variant: "outline", size: "lg" })}>
            {teachersPreview.cta}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
