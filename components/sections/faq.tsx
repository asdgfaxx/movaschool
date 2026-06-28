"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

export function Faq({ locale, dict }: { locale: string; dict: Dictionary }) {
  const { faq } = dict;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return faq.items.filter((item) => {
      const matchCat = category === "all" || item.category === category;
      const matchQuery =
        !query ||
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [faq.items, query, category]);

  return (
    <section className="py-20">
      <Container width="narrow">
        <SectionHeading kicker={faq.kicker} title={faq.title} subtitle={faq.subtitle} />

        {/* Search */}
        <div className="relative mt-8">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={faq.searchPlaceholder}
            className="w-full rounded-full border border-border bg-surface py-3 pl-12 pr-4 text-sm shadow-soft outline-none transition-colors focus:border-primary"
          />
        </div>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {faq.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                category === cat.id
                  ? "bg-[linear-gradient(110deg,var(--primary),var(--secondary))] text-primary-foreground shadow-soft"
                  : "border border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-6">
          {filtered.length > 0 ? (
            <Accordion items={filtered} defaultOpen={0} />
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {locale === "ru" ? "Ничего не найдено" : "Nic nie znaleziono"}
            </p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-border bg-surface-muted p-8 text-center">
          <h3 className="text-lg font-bold">{faq.ctaTitle}</h3>
          <p className="text-sm text-muted-foreground">{faq.ctaText}</p>
          <a href={`/${locale}/contact`} className={buttonClasses({ size: "lg", className: "mt-2" })}>
            {faq.ctaButton}
          </a>
        </div>
      </Container>
    </section>
  );
}
