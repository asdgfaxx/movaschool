"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TiltCard } from "@/components/motion/tilt-card";
import { Reveal } from "@/components/motion/reveal";
import { Pill } from "@/components/ui/pill";
import type { Dictionary } from "@/messages/types";

export function TeachersExplorer({ locale, dict }: { locale: string; dict: Dictionary }) {
  const [langFilter, setLangFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [specFilter, setSpecFilter] = useState("all");

  const allLanguages = useMemo(() => {
    const set = new Set<string>();
    dict.teachers.forEach((tc) => tc.languages?.forEach((l) => set.add(l)));
    return Array.from(set);
  }, [dict.teachers]);

  const allSpecialties = useMemo(() => {
    const set = new Set<string>();
    dict.teachers.forEach((tc) => tc.specialties?.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [dict.teachers]);

  const filtered = useMemo(() => {
    return dict.teachers.filter((tc) => {
      const matchLang = langFilter === "all" || tc.languages?.includes(langFilter);
      const matchLevel = levelFilter === "all" || tc.levels?.includes(levelFilter);
      const matchSpec = specFilter === "all" || tc.specialties?.includes(specFilter);
      return matchLang && matchLevel && matchSpec;
    });
  }, [dict.teachers, langFilter, levelFilter, specFilter]);

  const selectBase = "rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold outline-none focus:border-primary";

  return (
    <Container className="pb-12">
      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)} className={selectBase}>
          <option value="all">{locale === "ru" ? "Все языки" : "Wszystkie języki"}</option>
          {allLanguages.map((l) => (
            <option key={l} value={l}>{l.toUpperCase()}</option>
          ))}
        </select>
        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className={selectBase}>
          <option value="all">{locale === "ru" ? "Все уровни" : "Wszystkie poziomy"}</option>
          {["A1", "A2", "B1", "B2", "C1"].map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select value={specFilter} onChange={(e) => setSpecFilter(e.target.value)} className={selectBase}>
          <option value="all">{locale === "ru" ? "Все спец." : "Wszystkie specjalizacje"}</option>
          {allSpecialties.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <span className="ml-auto text-xs text-muted-foreground">
          {filtered.length} {locale === "ru" ? "преподавателей" : "lektorów"}
        </span>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((tc, i) => (
          <Reveal key={tc.id ?? tc.photo} delay={Math.min(i * 0.04, 0.3)}>
            <TiltCard
              className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-surface p-6 text-center shadow-soft transition-shadow duration-300 hover:shadow-clay"
              intensity={5}
            >
              {/* Avatar with gradient ring */}
              <div className="relative w-fit">
                <div className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))] opacity-0 blur transition-opacity duration-300 group-hover:opacity-70" />
                <Image
                  src={tc.photo}
                  alt={tc.name}
                  width={120}
                  height={120}
                  className="relative h-24 w-24 rounded-full object-cover ring-4 ring-surface sm:h-28 sm:w-28"
                />
              </div>

              <div>
                <h3 className="font-bold">{tc.name}</h3>
                <p className="text-xs text-muted-foreground">{tc.role}</p>
                <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {tc.experience}
                </p>
              </div>

              {/* Levels + specialties */}
              <div className="flex flex-col items-center gap-2">
                {tc.levels && (
                  <div className="flex flex-wrap justify-center gap-1">
                    {tc.levels.map((lvl) => (
                      <Pill key={lvl} tone="primary">{lvl}</Pill>
                    ))}
                  </div>
                )}
                {tc.specialties && (
                  <div className="flex flex-wrap justify-center gap-1">
                    {tc.specialties.map((sp) => (
                      <span key={sp} className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {sp}
                      </span>
                    ))}
                  </div>
                )}
                {tc.languages && (
                  <div className="flex flex-wrap justify-center gap-1">
                    {tc.languages.map((l) => (
                      <span key={l} className="text-[10px] font-bold uppercase text-muted-foreground/70">{l}</span>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href={`/${locale}/contact?teacher=${tc.id ?? ""}`}
                className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                {locale === "ru" ? "Пробный урок" : "Lekcja próbna"}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-muted-foreground">
          {locale === "ru" ? "Ничего не найдено" : "Nic nie znaleziono"}
        </p>
      )}
    </Container>
  );
}
