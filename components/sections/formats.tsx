import { MapPin, PlayCircle, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/messages/types";

const ICONS = { stationary: MapPin, online: Video, video: PlayCircle } as const;

export function Formats({ dict }: { dict: Dictionary }) {
  const { formats } = dict;
  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={formats.kicker} title={formats.title} subtitle={formats.subtitle} />
        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {formats.items.map((f) => {
            const Icon = ICONS[f.key];
            return (
              <StaggerItem key={f.key}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
                  <div className="relative flex items-center justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className="bg-accent/10 text-accent">{f.tag}</Badge>
                  </div>
                  <h3 className="relative mt-5 text-xl font-bold">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
