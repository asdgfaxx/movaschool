"use client";

import { useState } from "react";
import { Check, MapPin, PlayCircle, Video } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabPanel } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/messages/types";

const ICONS = { stationary: MapPin, online: Video, video: PlayCircle } as const;

export function Formats({ dict }: { dict: Dictionary }) {
  const { formats } = dict;
  const [active, setActive] = useState<string>(formats.items[0].key);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading kicker={formats.kicker} title={formats.title} subtitle={formats.subtitle} />

        <div className="mt-12 flex flex-col items-center gap-8">
          <Tabs
            tabs={formats.items.map((f) => ({ value: f.key, label: f.title }))}
            value={active}
            onChange={setActive}
            id="formats"
          />

          {formats.items.map((f) => {
            const Icon = ICONS[f.key];
            return (
              <TabPanel key={f.key} value={f.key} active={active} groupId="formats" className="w-full max-w-3xl">
                <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
                  <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
                    {/* Left: description */}
                    <div className="p-7">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="accent">{f.tag}</Badge>
                      </div>
                      <h3 className="mt-5 text-xl font-bold">{f.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                    </div>

                    {/* Right: features mini-table */}
                    <div className="border-t border-border bg-surface-muted p-7 md:border-l md:border-t-0">
                      <ul className="grid gap-3">
                        {f.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-sm font-medium">
                            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                              <Check className="h-3 w-3" />
                            </span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabPanel>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
