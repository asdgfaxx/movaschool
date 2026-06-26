"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { locales } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const META: Record<string, { flag: string; name: string; short: string }> = {
  pl: { flag: "🇵🇱", name: "Polski", short: "PL" },
  ru: { flag: "🇷🇺", name: "Русский", short: "RU" },
};

function localizedHref(pathname: string, locale: string): string {
  const parts = pathname.split("/");
  parts[1] = locale;
  return parts.join("/") || `/${locale}`;
}

export function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const cur = META[current] ?? META.pl;

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={cur.name}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-2.5 py-1.5 text-xs font-bold backdrop-blur transition-colors hover:border-primary"
      >
        <Globe className="h-3.5 w-3.5 text-muted-foreground" />
        <span aria-hidden>{cur.flag}</span>
        <span>{cur.short}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="glass-strong absolute right-0 z-50 mt-2 flex w-40 flex-col gap-0.5 rounded-xl border border-border p-1.5 shadow-float"
        >
          {locales.map((l) => {
            const m = META[l];
            const active = l === current;
            return (
              <li key={l} role="option" aria-selected={active}>
                <Link
                  href={localizedHref(pathname, l)}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-surface-muted",
                  )}
                >
                  <span aria-hidden className="text-base">{m.flag}</span>
                  <span>{m.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
