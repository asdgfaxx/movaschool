import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getIcon } from "@/components/icons/registry";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { why } = dict;

  const spans = [
    "lg:col-span-2",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-1",
    "lg:col-span-3",
  ];

  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={why.kicker} title={why.title} subtitle={why.subtitle} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item, i) => {
            const Icon = getIcon(item.icon);
            const isFeatured = i === 0;
            const isWide = i === 5;

            return (
              <Reveal key={item.title} delay={i * 0.05} className={cn(spans[i])}>
                <div
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay",
                    isFeatured && "p-7",
                    isWide && "flex flex-row items-center gap-4",
                  )}
                >
                  {isFeatured && (
                    <>
                      <div className="bg-grid absolute inset-0 -z-10 opacity-20" aria-hidden />
                      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/5 blur-2xl" />
                    </>
                  )}
                  <div className={cn("mb-4 inline-flex items-center justify-center rounded-xl", isFeatured ? "h-14 w-14 bg-primary text-primary-foreground" : "h-10 w-10 bg-primary/10 text-primary")}>
                    <Icon className={isFeatured ? "h-7 w-7" : "h-5 w-5"} />
                  </div>
                  <h3 className={cn("font-bold", isFeatured && "text-xl")}>{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
