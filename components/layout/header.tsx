"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type Item = { label: string; href: string };

export function Header({
  locale,
  items,
  cta,
  themeLabel,
  menuLabel,
}: {
  locale: string;
  items: Item[];
  cta: Item;
  themeLabel: string;
  menuLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher current={locale} />
          </div>
          <ThemeToggle label={themeLabel} />
          <Link href={cta.href} className={cn(buttonClasses({ size: "sm" }), "hidden sm:inline-flex")}>
            {cta.label}
          </Link>
          <button
            type="button"
            aria-label={menuLabel}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-5 py-4 sm:px-6">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base font-semibold text-foreground hover:bg-surface-muted"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between">
                <LocaleSwitcher current={locale} />
                <Link href={cta.href} className={buttonClasses({ size: "sm" })}>
                  {cta.label}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
