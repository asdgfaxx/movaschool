"use client";

import { useState, useEffect } from "react";

export interface TocItem {
  id: string;
  label: string;
}

export function TableOfContents({ items, label }: { items: TocItem[]; label: string }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="flex flex-col gap-2" aria-label={label}>
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
      <ul className="flex flex-col gap-1.5 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 px-3 py-1 text-sm transition-colors ${
                activeId === item.id
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              style={{ marginLeft: "-2px" }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
