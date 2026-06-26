"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CalendarRange, Clock, LayoutGrid, Table as TableIcon, Search, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { TiltCard } from "@/components/motion/tilt-card";
import { Reveal } from "@/components/motion/reveal";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { getIcon } from "@/components/icons/registry";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

type CourseWithGroup = Dictionary["pages"]["courses"]["groups"][number]["courses"][number] & {
  groupId: string;
  groupTitle: string;
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

function normalizeLevel(level: string): string[] {
  return level
    .replace(/\+/g, "")
    .split(/[–\-]/)
    .map((l) => l.trim());
}

export function CoursesExplorer({ locale, dict }: { locale: string; dict: Dictionary }) {
  const c = dict.pages.courses;
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");

  const allCourses = useMemo<CourseWithGroup[]>(
    () =>
      c.groups.flatMap((g) =>
        g.courses.map((course) => ({ ...course, groupId: g.id, groupTitle: g.title })),
      ),
    [c],
  );

  const filtered = useMemo(() => {
    return allCourses.filter((course) => {
      const matchCategory = categoryFilter === "all" || course.groupId === categoryFilter;
      const matchLevel =
        levelFilter === "all" ||
        normalizeLevel(course.level).includes(levelFilter) ||
        course.level.includes(levelFilter);
      const matchQuery =
        !query ||
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.level.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchLevel && matchQuery;
    });
  }, [allCourses, levelFilter, categoryFilter, query]);

  const hasFilters = levelFilter !== "all" || categoryFilter !== "all" || query !== "";

  function reset() {
    setLevelFilter("all");
    setCategoryFilter("all");
    setQuery("");
  }

  return (
    <>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/80 backdrop-blur-xl">
        <Container className="py-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[180px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === "ru" ? "Поиск..." : "Szukaj..."}
                className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Level filter */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold outline-none focus:border-primary"
            >
              <option value="all">{c.filterLevel}</option>
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>

            {/* Category filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold outline-none focus:border-primary"
            >
              <option value="all">{c.filterCategory}</option>
              {c.groups.map((g) => (
                <option key={g.id} value={g.id}>{g.title}</option>
              ))}
            </select>

            {hasFilters && (
              <button
                onClick={reset}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
                {c.filterReset}
              </button>
            )}

            {/* View toggle */}
            <div className="ml-auto inline-flex rounded-full border border-border bg-surface p-1">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={c.viewGrid}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("table")}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  view === "table" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={c.viewTable}
              >
                <TableIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <p className="mt-2 text-xs text-muted-foreground">
            {c.resultsCount}: <span className="font-bold text-foreground">{filtered.length}</span>
          </p>
        </Container>
      </div>

      <div className="pb-12 pt-8">
        <Container>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-lg font-bold">{c.notFoundTitle}</p>
              <p className="max-w-md text-sm text-muted-foreground">{c.notFoundText}</p>
              <MagneticButton href={`/${locale}/contact`} variant="outline" size="lg">
                {c.notFoundCta}
              </MagneticButton>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course, i) => {
                const Icon = getIcon(course.icon);
                return (
                  <Reveal key={course.id ?? course.name} delay={Math.min(i * 0.03, 0.3)}>
                    <TiltCard
                      className="group flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay"
                      intensity={5}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold">{course.name}</h3>

                      {/* Syllabus expand on hover */}
                      {course.syllabus && (
                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-48 group-hover:opacity-100">
                          <ul className="space-y-1 border-l-2 border-primary/20 pl-3">
                            {course.syllabus.map((s) => (
                              <li key={s} className="text-xs text-muted-foreground">{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <ul className="mt-auto space-y-1.5 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 shrink-0 text-primary" /> {course.freq}
                        </li>
                        <li className="flex items-center gap-2">
                          <CalendarRange className="h-4 w-4 shrink-0 text-primary" /> {course.duration}
                        </li>
                      </ul>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-accent">{course.price}</span>
                        <Link
                          href={`/${locale}/contact?course=${course.id ?? course.name}`}
                          className="inline-flex items-center gap-1 rounded-full border border-border px-4 py-1.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                        >
                          {c.cta}
                        </Link>
                      </div>
                    </TiltCard>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border bg-surface-muted">
                  <tr>
                    <th className="px-5 py-4 font-bold">{c.headCourse}</th>
                    <th className="px-5 py-4 font-bold">{c.filterLevel}</th>
                    <th className="hidden px-5 py-4 font-bold sm:table-cell">{c.headFreq}</th>
                    <th className="hidden px-5 py-4 font-bold md:table-cell">{c.headDuration}</th>
                    <th className="px-5 py-4 font-bold">{c.headPrice}</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((course) => (
                    <tr key={course.id ?? course.name} className="border-b border-border last:border-0 transition-colors hover:bg-surface-muted">
                      <td className="px-5 py-4">
                        <span className="font-bold">{course.name}</span>
                        <span className="block text-xs text-muted-foreground">{course.groupTitle}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {course.level}
                        </span>
                      </td>
                      <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{course.freq}</td>
                      <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">{course.duration}</td>
                      <td className="px-5 py-4 font-bold text-accent">{course.price}</td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/${locale}/contact?course=${course.id ?? course.name}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        >
                          {c.cta}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
