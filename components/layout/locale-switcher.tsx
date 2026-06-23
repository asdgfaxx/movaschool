"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ current }: { current: string }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: string) {
    const parts = pathname.split("/");
    parts[1] = locale;
    router.push(parts.join("/") || `/${locale}`);
  }

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface/60 p-0.5 backdrop-blur">
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === current}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-bold uppercase transition-colors",
            l === current
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
