"use client";

import { type ReactNode, useState, useId } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export type AccordionItem = {
  id?: string;
  q: ReactNode;
  a: ReactNode;
};

export function Accordion({
  items,
  defaultOpen = 0,
  className,
  itemClassName,
}: {
  items: AccordionItem[];
  /** Index of the item open by default; pass null for all-closed. */
  defaultOpen?: number | null;
  className?: string;
  itemClassName?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduce = useReducedMotion() ?? false;
  const autoId = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${autoId}-btn-${i}`;
        const panelId = `${autoId}-panel-${i}`;
        return (
          <div
            key={item.id ?? i}
            className={cn(
              "overflow-hidden rounded-2xl border border-border bg-surface shadow-soft",
              itemClassName,
            )}
          >
            <button
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-bold">{item.q}</span>
              <Plus
                className={cn(
                  "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
