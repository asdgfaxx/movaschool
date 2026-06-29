import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone, MessageCircle, Send } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { LeadForm } from "@/components/sections/lead-form";
import { Reveal } from "@/components/motion/reveal";
import { WHATSAPP, TELEGRAM_CONTACT } from "@/lib/site";

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

  const channels = [
    { icon: Mail, label: info.email, href: `mailto:${info.email}`, color: "text-primary" },
    { icon: Phone, label: info.phone, href: `tel:${info.phone.replace(/\s/g, "")}`, color: "text-primary" },
    { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP, color: "text-accent" },
    { icon: Send, label: "Telegram", href: TELEGRAM_CONTACT, color: "text-secondary" },
  ];

  const meta = [
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

      {/* Channels bento grid */}
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, label, href, color }) => (
            <Reveal key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-clay"
              >
                <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ${color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Meta + Map */}
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
          {/* Hours + address */}
          <div className="flex flex-col gap-4">
            {meta.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 shadow-soft">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>

          {/* Stylized map placeholder */}
          <Reveal>
            <div className="relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-soft">
              {/* Stylized map background */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--primary)/5,var(--secondary)/5)]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
                aria-hidden
              />
              {/* Pin */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-clay">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="mt-1 h-3 w-3 rotate-45 -translate-y-1.5 bg-primary shadow" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-xl bg-surface/90 px-4 py-2 shadow-soft backdrop-blur">
                <p className="text-sm font-bold">{info.address}</p>
                <p className="text-xs text-muted-foreground">Warszawa, Polska</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <Suspense>
        <LeadForm locale={loc} dict={dict} />
      </Suspense>
    </>
  );
}
