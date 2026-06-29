import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileText, ArrowRight } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { TableOfContents, type TocItem } from "@/components/blog/table-of-contents";
import { cn } from "@/lib/utils";

const DOCS = ["privacy", "refund", "terms"] as const;
type Doc = (typeof DOCS)[number];

export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}

function isDoc(value: string): value is Doc {
  return (DOCS as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isDoc(doc)) return {};
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.legal[doc].title };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { locale, doc } = await params;
  if (!isDoc(doc)) notFound();
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const legal = dict.pages.legal;
  const d = legal[doc];

  const tocItems: TocItem[] = d.sections.map((s) => ({
    id: s.id,
    label: s.heading,
  }));

  const otherDocs = DOCS.filter((key) => key !== doc);

  return (
    <>
      {/* Compact hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface pb-10 pt-32 lg:pt-36">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <Container className="relative">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <FileText className="h-4 w-4" />
              {legal.effectiveDateLabel}: {d.updated}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-3xl font-extrabold leading-[1.15] text-balance sm:text-4xl">{d.title}</h1>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-16 pt-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Sidebar (desktop, sticky) */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              {/* Document switcher */}
              <nav className="flex flex-col gap-1" aria-label="Documents">
                {DOCS.map((key) => {
                  const docData = legal[key];
                  const isActive = key === doc;
                  return (
                    <Link
                      key={key}
                      href={`/${loc}/legal/${key}`}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-surface-muted",
                      )}
                    >
                      <FileText className="h-4 w-4 shrink-0" />
                      {docData.title}
                    </Link>
                  );
                })}
              </nav>

              {/* In-page TOC */}
              {tocItems.length > 0 && (
                <TableOfContents items={tocItems} label={legal.seeAlsoLabel} />
              )}

              {/* Cross-links */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {legal.seeAlsoLabel}
                </span>
                {otherDocs.map((key) => (
                  <Link
                    key={key}
                    href={`/${loc}/legal/${key}`}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {legal[key].title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile document switcher */}
          <div className="flex flex-wrap gap-2 lg:hidden">
            {DOCS.map((key) => {
              const isActive = key === doc;
              return (
                <Link
                  key={key}
                  href={`/${loc}/legal/${key}`}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  {legal[key].title}
                </Link>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex flex-col gap-6">
              {d.sections.map((s, i) => (
                <Reveal key={s.id} delay={Math.min(i * 0.03, 0.15)}>
                  <section id={s.id} className="scroll-mt-28">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm font-bold tabular-nums text-primary/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-lg font-bold sm:text-xl">{s.heading}</h2>
                    </div>
                    <p className="mt-2 pl-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {s.body}
                    </p>
                  </section>
                </Reveal>
              ))}
            </div>

            {/* Cross-links (mobile, bottom) */}
            <div className="mt-10 flex flex-col gap-3 lg:hidden">
              <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {legal.seeAlsoLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {otherDocs.map((key) => (
                  <Link
                    key={key}
                    href={`/${loc}/legal/${key}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {legal[key].title}
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
