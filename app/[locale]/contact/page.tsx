import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { LeadForm } from "@/components/sections/lead-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.pages.contact.title, description: dict.pages.contact.subtitle };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const info = dict.contactInfo;

  const cards = [
    { icon: Mail, label: info.email, href: `mailto:${info.email}` },
    { icon: Phone, label: info.phone, href: `tel:${info.phone.replace(/\s/g, "")}` },
    { icon: Clock, label: info.hours },
    { icon: MapPin, label: info.address },
  ];

  return (
    <>
      <PageHeader
        kicker={dict.nav.contact}
        title={dict.pages.contact.title}
        subtitle={dict.pages.contact.subtitle}
      />
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, label, href }) => {
            const inner = (
              <div className="flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-colors hover:border-primary">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            );
            return href ? (
              <a key={label} href={href}>
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            );
          })}
        </div>
      </Container>
      <Suspense>
        <LeadForm locale={loc} dict={dict} />
      </Suspense>
    </>
  );
}
