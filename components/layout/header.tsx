"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Logo } from "./logo";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { CourseGroup } from "@/messages/types";

type Item = { label: string; href: string };

const SESSION_KEY = "mova:announcement-dismissed";
const ANNOUNCEMENT_EVENT = "mova:announcement-change";

function dispatchAnnouncementChange() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(ANNOUNCEMENT_EVENT));
}

function subscribeAnnouncement(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(ANNOUNCEMENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(ANNOUNCEMENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

function readAnnouncementDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return !!sessionStorage.getItem(SESSION_KEY);
  } catch {
    return true;
  }
}

function useAnnouncementVisible(announcement: string): boolean {
  const dismissed = useSyncExternalStore(
    subscribeAnnouncement,
    readAnnouncementDismissed,
    () => true,
  );
  return !!announcement && !dismissed;
}

export function Header({
  locale,
  items,
  cta,
  themeLabel,
  menuLabel,
  announcement,
  coursesGroups,
  closeLabel,
  megaLevelsLabel,
  megaCategoriesLabel,
}: {
  locale: string;
  items: Item[];
  cta: Item;
  themeLabel: string;
  menuLabel: string;
  announcement: string;
  coursesGroups: CourseGroup[];
  closeLabel: string;
  megaLevelsLabel: string;
  megaCategoriesLabel: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const announcementVisible = useAnnouncementVisible(announcement);
  const pathname = usePathname();
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const megaCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismissAnnouncement() {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    dispatchAnnouncementChange();
  }

  function openMega() {
    if (megaCloseTimer.current) clearTimeout(megaCloseTimer.current);
    setMegaOpen(true);
  }
  function scheduleCloseMega() {
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 120);
  }

  // Focus trap for the mobile overlay.
  useEffect(() => {
    if (!open) return;
    const panel = mobilePanelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const els = Array.from(
        panel!.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (els.length === 0) return;
      const active = document.activeElement as HTMLElement;
      const idx = els.indexOf(active);
      e.preventDefault();
      const next = e.shiftKey ? (idx - 1 + els.length) % els.length : (idx + 1) % els.length;
      els[next].focus();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const coursesItem = items.find((i) => i.href.includes("/courses"));
  const otherItems = items.filter((i) => i !== coursesItem);
  const levels = ["A1", "A2", "B1", "B2", "C1"];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <AnimatePresence>
        {announcementVisible && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden bg-[linear-gradient(90deg,var(--primary),var(--secondary))] text-primary-foreground"
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-3 px-5 py-2 text-center text-xs font-semibold sm:text-sm">
              <span>{announcement}</span>
              <button
                type="button"
                onClick={dismissAnnouncement}
                aria-label={closeLabel}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "glass-strong border-b border-border" : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:h-20 lg:px-8">
          <Logo locale={locale} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {/* Courses with mega-menu */}
            {coursesItem && (
              <div
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                <Link
                  href={coursesItem.href}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    pathname.startsWith(coursesItem.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {coursesItem.label}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", megaOpen && "rotate-180")} />
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="glass-strong absolute left-1/2 top-full z-50 mt-2 w-[34rem] -translate-x-1/2 rounded-2xl border border-border p-4 shadow-float"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            {megaLevelsLabel}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {levels.map((lvl) => (
                              <Link
                                key={lvl}
                                href={`${coursesItem.href}?level=${lvl}`}
                                className="rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
                              >
                                {lvl}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            {megaCategoriesLabel}
                          </p>
                          <ul className="flex flex-col gap-1.5">
                            {coursesGroups.map((g) => (
                              <li key={g.id}>
                                <Link
                                  href={`${coursesItem.href}?category=${g.id}`}
                                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                >
                                  {g.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {otherItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[linear-gradient(90deg,var(--primary),var(--secondary))]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LocaleSwitcher current={locale} />
            </div>
            <ThemeToggle label={themeLabel} />
            <div className="hidden sm:block">
              <MagneticButton href={cta.href} size="sm" strength={4}>
                {cta.label}
              </MagneticButton>
            </div>
            <button
              type="button"
              aria-label={menuLabel}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={mobilePanelRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Logo locale={locale} />
              <button
                type="button"
                aria-label={closeLabel}
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.05 } } }}
            >
              {items.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-4 text-2xl font-extrabold text-foreground hover:bg-surface-muted"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-5">
              <LocaleSwitcher current={locale} />
              <Link href={cta.href} className={buttonClasses({ size: "md" })}>
                {cta.label}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
