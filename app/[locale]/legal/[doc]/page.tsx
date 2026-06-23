import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

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
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  const d = dict.pages.legal[doc];

  return (
    <>
      <PageHeader title={d.title} subtitle={d.updated} />
      <Container className="max-w-3xl pb-12">
        <div className="flex flex-col gap-6">
          {d.sections.map((s) => (
            <Reveal key={s.heading}>
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft">
                <h2 className="text-lg font-bold">{s.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
