import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import type { Dictionary } from "@/messages/types";

export function Steps({ dict }: { dict: Dictionary }) {
  const { steps } = dict;
  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading kicker={steps.kicker} title={steps.title} subtitle={steps.subtitle} />
        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
            aria-hidden
          />
          <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.items.map((step, i) => (
              <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-xl font-extrabold text-primary-foreground shadow-clay">
                  {i + 1}
                </div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}
