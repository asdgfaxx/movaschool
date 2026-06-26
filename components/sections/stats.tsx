import { Container } from "@/components/ui/container";
import { StatTile } from "@/components/ui/stat-tile";
import { Reveal } from "@/components/motion/reveal";
import { getIcon } from "@/components/icons/registry";
import type { Dictionary } from "@/messages/types";

export function Stats({ locale, dict }: { locale: string; dict: Dictionary }) {
  return (
    <section className="py-6">
      <Container>
        <Reveal>
          <div className="glass-strong grid grid-cols-2 gap-4 rounded-[2rem] p-6 shadow-float md:grid-cols-4 md:p-8">
            {dict.stats.items.map((s) => (
              <StatTile
                key={s.label}
                icon={getIcon(s.icon)}
                value={s.value}
                label={s.label}
                trend={s.trend}
                locale={locale}
                className="border-0 bg-transparent shadow-none backdrop-blur-none"
              />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
