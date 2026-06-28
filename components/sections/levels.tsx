"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import type { Dictionary } from "@/messages/types";

const LEVEL_COLORS: Record<string, { bg: string; text: string; ring: string }> = {
  A1: { bg: "var(--primary-500)", text: "var(--primary-foreground)", ring: "var(--primary-100)" },
  A2: { bg: "var(--secondary-500)", text: "var(--primary-foreground)", ring: "var(--secondary-100)" },
  B1: { bg: "var(--info)", text: "var(--info-foreground)", ring: "color-mix(in oklab, var(--info) 20%, transparent)" },
  B2: { bg: "var(--accent-500)", text: "var(--accent-foreground)", ring: "var(--accent-100)" },
  C1: { bg: "var(--gold)", text: "var(--gold-foreground)", ring: "color-mix(in oklab, var(--gold) 20%, transparent)" },
};

export function Levels({ locale, dict }: { locale: string; dict: Dictionary }) {
  const { levels } = dict;
  const searchParams = useSearchParams();
  const userLevel = searchParams.get("level") ?? searchParams.get("from");

  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading kicker={levels.kicker} title={levels.title} subtitle={levels.subtitle} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {levels.items.map((lvl, i) => {
            const colors = LEVEL_COLORS[lvl.code] ?? LEVEL_COLORS.A1;
            const isHere = userLevel === lvl.code;

            return (
              <Reveal key={lvl.code} delay={i * 0.05}>
                <Link
                  href={`/${locale}/level-test?from=${lvl.code}`}
                  className="group relative flex h-full flex-col gap-3 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay"
                  style={isHere ? { borderColor: colors.bg, boxShadow: `0 0 0 2px ${colors.bg}` } : undefined}
                >
                  {isHere && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-background px-3 py-1 text-xs font-bold shadow-soft" style={{ color: colors.bg }}>
                      <MapPin className="h-3 w-3" />
                      {levels.youAreHere}
                    </span>
                  )}

                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-base font-extrabold shadow-soft transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${colors.bg}, color-mix(in oklab, ${colors.bg} 70%, var(--secondary)))`, color: colors.text }}
                  >
                    {lvl.code}
                  </span>

                  <h3 className="text-base font-bold leading-snug">{lvl.name}</h3>

                  <AnimatePresence>
                    <motion.div
                      initial={false}
                      className="overflow-hidden"
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm leading-relaxed text-muted-foreground">{lvl.blurb}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: colors.bg }}>
                        {levels.testPrompt}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <a href={`/${locale}/courses`} className={buttonClasses({ variant: "outline", size: "lg" })}>
            {levels.cta}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
