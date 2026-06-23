import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import type { Dictionary } from "@/messages/types";

export function WhyUs({ dict }: { dict: Dictionary }) {
  const { why } = dict;
  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={why.kicker} title={why.title} subtitle={why.subtitle} />
        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {why.items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex h-full gap-4 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
