"use client";

import { Star, Play } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { TiltCard } from "@/components/motion/tilt-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Dictionary } from "@/messages/types";

function ReviewCard({ r }: { r: Dictionary["reviews"]["items"][number] }) {
  return (
    <TiltCard
      className="group w-[340px] shrink-0 rounded-3xl border border-border bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-clay"
      intensity={5}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-amber-400">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <span className="text-xs font-semibold text-primary">{r.platform}</span>
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-sm font-bold text-primary-foreground">
          {r.name[0]}
        </div>
        <div>
          <p className="text-sm font-bold">{r.name}</p>
          <p className="text-xs text-muted-foreground">{r.role}</p>
        </div>
      </figcaption>
    </TiltCard>
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

      {/* Marquee rows */}
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

      {/* Video placeholder + platform links */}
      <Container>
        <div className="mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Video placeholder */}
          <div className="group relative flex h-20 w-72 cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--primary)/10,var(--secondary)/10)]" />
            <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-primary-foreground shadow-clay transition-transform duration-300 group-hover:scale-110">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="relative text-sm font-semibold text-muted-foreground">Video отзывы</span>
          </div>

          {/* Platform links */}
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
