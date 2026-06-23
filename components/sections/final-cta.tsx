import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

export function FinalCta({ locale, dict }: { locale: string; dict: Dictionary }) {
  const t = dict.finalCta;
  return (
    <section className="pb-8 pt-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(130deg,var(--primary),var(--secondary))] px-8 py-16 text-center shadow-clay sm:px-16">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" aria-hidden />
            <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden />
            <div className="relative mx-auto max-w-2xl text-primary-foreground">
              <h2 className="text-3xl font-extrabold text-balance sm:text-4xl lg:text-5xl">{t.title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/85">{t.subtitle}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href={`/${locale}/contact`} className={buttonClasses({ variant: "white", size: "lg" })}>
                  {t.primary}
                </Link>
                <Link
                  href={`/${locale}/level-test`}
                  className={cn(
                    buttonClasses({ size: "lg" }),
                    "bg-white/15 text-white backdrop-blur hover:bg-white/25",
                  )}
                >
                  {t.secondary}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
