"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";

const STORAGE_KEY = "theme";

export function Providers({ children }: { children: React.ReactNode }) {
  // Re-apply theme from localStorage on every mount/navigation, since the
  // inline ThemeScript in <head> only runs on a full page load and React
  // reconciles the <html> className during client-side locale switches.
  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEY);
      const dark = t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", dark);
    } catch {}
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
