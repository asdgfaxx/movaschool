import { Award, LayoutGrid, MessagesSquare, Mic, Users, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import type { Dictionary } from "@/messages/types";

const ICONS = [Users, Video, LayoutGrid, MessagesSquare, Mic, Award];

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const { how } = dict;
  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={how.kicker} title={how.title} subtitle={how.subtitle} />
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {how.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={item.title}>
                <div className="group h-full rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
