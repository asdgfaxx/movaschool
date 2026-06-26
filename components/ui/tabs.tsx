"use client";

import { type ReactNode, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

export function Tabs({
  tabs,
  value,
  onChange,
  className,
  tabClassName,
  id,
}: {
  tabs: { value: string; label: ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  tabClassName?: string;
  id?: string;
}) {
  const autoId = useId();
  const groupId = id ?? autoId;

  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface/60 p-1 backdrop-blur",
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`${groupId}-panel-${tab.value}`}
            id={`${groupId}-tab-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              tabClassName,
            )}
          >
            {active && (
              <motion.span
                layoutId={`${groupId}-indicator`}
                className="absolute inset-0 -z-0 rounded-full bg-[linear-gradient(110deg,var(--primary),var(--secondary))]"
                transition={{ duration: 0.3, ease: EASE }}
              />
            )}
            <span className="relative z-[1]">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TabPanel({
  value,
  active,
  children,
  className,
  id,
  groupId,
}: {
  value: string;
  active: string;
  children: ReactNode;
  className?: string;
  id?: string;
  groupId: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const show = value === active;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {show && (
        <motion.div
          role="tabpanel"
          id={id ?? `${groupId}-panel-${value}`}
          aria-labelledby={`${groupId}-tab-${value}`}
          className={className}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
