"use client";

import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme";

/**
 * Theme toggle. The displayed icon is driven by CSS (the `.dark` class on
 * <html>), so no state read-back or effect is needed: Moon shows in light,
 * Sun shows in dark. The ThemeScript sets the class before paint and honours
 * `prefers-color-scheme` as a fallback when localStorage is empty.
 */
export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground backdrop-blur transition-colors hover:text-primary"
    >
      <Sun className="hidden h-[18px] w-[18px] dark:inline" />
      <Moon className="inline h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}
