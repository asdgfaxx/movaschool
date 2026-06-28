"use client";

import { useState, useMemo } from "react";
import { Users, TrendingUp } from "lucide-react";
import type { Dictionary } from "@/messages/types";

export function CommissionCalculator({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: string;
}) {
  const p = dict.pages.partnership;
  const [students, setStudents] = useState(10);
  const avgPrice = 420;

  const rate = useMemo(() => {
    const tier = [...p.calculatorTiers].reverse().find((t) => students >= t.min);
    return tier?.rate ?? p.calculatorTiers[0].rate;
  }, [students, p.calculatorTiers]);

  const commission = Math.round((students * avgPrice * rate) / 100);

  const fmt = new Intl.NumberFormat(locale === "ru" ? "ru-RU" : "pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  });

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <h3 className="text-lg font-bold">{p.calculatorTitle}</h3>

      <div className="mt-6 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </span>
        <span className="text-sm font-semibold">{p.calculatorStudentsLabel}</span>
      </div>

      <input
        type="range"
        min={1}
        max={50}
        value={students}
        onChange={(e) => setStudents(Number(e.target.value))}
        className="mt-4 w-full accent-primary"
      />

      <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
        <span>1</span>
        <span className="text-lg font-bold text-foreground">{students}</span>
        <span>50</span>
      </div>

      {/* Results */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-surface-muted p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {p.calculatorRate}
          </p>
          <p className="mt-1 text-2xl font-extrabold text-primary">{rate}%</p>
        </div>
        <div className="rounded-xl bg-primary p-4 text-primary-foreground">
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide opacity-90">
            <TrendingUp className="h-3 w-3" />
            {p.calculatorCommissionLabel}
          </p>
          <p className="mt-1 text-2xl font-extrabold">{fmt.format(commission)}</p>
        </div>
      </div>

      {/* Tier breakdown */}
      <div className="mt-4 flex flex-wrap gap-2">
        {p.calculatorTiers.map((t) => (
          <span
            key={t.min}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              rate === t.rate
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-surface text-muted-foreground"
            }`}
          >
            {t.min}+ → {t.rate}%
          </span>
        ))}
      </div>
    </div>
  );
}
