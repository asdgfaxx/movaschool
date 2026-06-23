import { Aurora } from "@/components/motion/aurora";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-12 pt-32 lg:pt-40">
      <Aurora className="opacity-70" />
      <Container className="relative text-center">
        {kicker && (
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {kicker}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-balance sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
