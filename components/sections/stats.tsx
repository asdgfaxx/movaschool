import { Counter } from "@/components/motion/counter";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/messages/types";

export function Stats({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-6">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-6 rounded-[2rem] border border-border bg-surface p-8 shadow-soft md:grid-cols-4 md:p-12">
            {dict.stats.items.map((s) => (
              <div key={s.label} className="text-center">
                <Counter
                  value={s.value}
                  className="text-gradient block text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
