import Image from "next/image";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/messages/types";

export function Reviews({ dict }: { dict: Dictionary }) {
  const { reviews } = dict;
  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={reviews.kicker} title={reviews.title} subtitle={reviews.subtitle} />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.items.map((r) => (
            <StaggerItem key={r.name}>
              <figure className="flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-foreground">
                  “{r.text}”
                </blockquote>
                <figcaption className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-sm font-bold">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary">{r.platform}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-80">
            {[1, 2, 3].map((n) => (
              <Image
                key={n}
                src={`/platforms/platforms-${n}.png`}
                alt="Review platform"
                width={120}
                height={40}
                className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
