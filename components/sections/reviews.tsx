import { Star, Play } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/messages/types";

function ReviewCard({ r }: { r: Dictionary["reviews"]["items"][number] }) {
  return (
    <div className="w-[340px] shrink-0 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-amber-500">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="text-xs font-semibold text-primary">{r.platform}</span>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
        &ldquo;{r.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
          {(r.name[0] ?? "?").toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-bold">{r.name}</p>
          <p className="text-xs text-muted-foreground">{r.role}</p>
        </div>
      </figcaption>
    </div>
  );
}

export function Reviews({ dict }: { dict: Dictionary }) {
  const { reviews } = dict;
  const half = Math.ceil(reviews.items.length / 2);
  const row1 = reviews.items.slice(0, half);
  const row2 = reviews.items.slice(half);

  const platforms = [
    { name: "Google", rating: "4.9", href: "https://google.com" },
    { name: "Trustpilot", rating: "4.8", href: "https://trustpilot.com" },
    { name: "Facebook", rating: "5.0", href: "https://facebook.com" },
  ];

  return (
    <section className="overflow-hidden py-20">
      <Container>
        <SectionHeading kicker={reviews.kicker} title={reviews.title} subtitle={reviews.subtitle} />
      </Container>

      <div className="mt-12 flex flex-col gap-4">
        <Marquee speed={40} pauseOnHover gapClassName="gap-5">
          {row1.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </Marquee>
        <Marquee speed={40} direction="right" pauseOnHover gapClassName="gap-5">
          {row2.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </Marquee>
      </div>

      <Container>
        <div className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <button
            type="button"
            className="group relative flex h-20 w-72 items-center justify-center gap-3 overflow-hidden rounded-xl border border-border bg-surface shadow-soft transition-shadow hover:shadow-clay"
          >
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-clay transition-transform duration-300 group-hover:scale-110">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="text-sm font-semibold text-muted-foreground">{reviews.videoLabel}</span>
          </button>

          <div className="flex items-center gap-6">
            {platforms.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
                <span className="text-sm font-bold text-foreground">{p.name}</span>
                <span className="text-xs font-semibold text-amber-500">★ {p.rating}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
