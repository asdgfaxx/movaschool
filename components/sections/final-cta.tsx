import { Phone, Flame } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { buttonClasses } from "@/components/ui/button";
import type { Dictionary } from "@/messages/types";

export function FinalCta({ locale, dict }: { locale: string; dict: Dictionary }) {
  const t = dict.finalCta;
  const phone = dict.contactInfo.phone;
  const telHref = `tel:${phone.replace(/[\s()-]/g, "")}`;

  return (
    <section className="pb-8 pt-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-8 py-16 text-center shadow-clay sm:px-16">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
              <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              {/* Urgency element */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-sm font-bold text-destructive">
                <Flame className="h-4 w-4" />
                <Counter value={t.urgencyValue} locale={locale} />
                <span className="font-medium">{t.urgencyText}</span>
              </div>

              <h2 className="text-3xl font-extrabold text-balance text-foreground sm:text-4xl lg:text-5xl">{t.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t.subtitle}</p>

              {/* Click-to-call */}
              <a href={telHref} className="mt-6 inline-flex items-center gap-2 text-lg font-bold text-primary hover:underline">
                <Phone className="h-5 w-5" />
                {phone}
              </a>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href={`/${locale}/contact`} className={buttonClasses({ size: "lg" })}>
                  {t.primary}
                </a>
                <a href={`/${locale}/level-test`} className={buttonClasses({ variant: "outline", size: "lg" })}>
                  {t.secondary}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
