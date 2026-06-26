"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

type Status = "idle" | "sending" | "success" | "error";

const inputBase =
  "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring/40";

export function LeadForm({ dict }: { locale: string; dict: Dictionary }) {
  const t = dict.lead;
  const searchParams = useSearchParams();
  const presetCourse = searchParams.get("course") ?? "";
  const presetTeacher = searchParams.get("teacher") ?? "";

  const courseOptions = useMemo(() => {
    return dict.pages.courses.groups.flatMap((g) =>
      g.courses.map((c) => `${c.name} (${c.level})`),
    );
  }, [dict]);

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => setStatus("idle"), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    const errs: Record<string, string> = {};
    if (!name) errs.name = t.required;
    if (!email) errs.email = t.required;
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = t.invalidEmail;
    if (!phone) errs.phone = t.required;
    else if (!/^[+\d\s()-]{7,}$/.test(phone)) errs.phone = t.required;
    if (!consent) errs.consent = t.required;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="lead" className="scroll-mt-24 py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {t.kicker}
            </span>
            <h2 className="text-3xl font-extrabold leading-tight text-balance sm:text-4xl">
              {t.title}
            </h2>
            <p className="max-w-md text-base text-muted-foreground sm:text-lg">{t.subtitle}</p>
          </div>

          <div className="relative">
            {/* Gradient glow */}
            <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-[linear-gradient(140deg,var(--primary),var(--secondary),var(--accent))] opacity-15 blur-xl" />

            {status === "success" ? (
              <div className="glass-strong flex flex-col items-center gap-4 rounded-[1.75rem] p-10 text-center shadow-glow">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="text-xl font-bold">{t.successTitle}</h3>
                <p className="text-sm text-muted-foreground">{t.successText}</p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="glass-strong flex flex-col gap-4 rounded-[1.75rem] p-6 shadow-glow sm:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label={t.name} error={errors.name}>
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder={t.namePh}
                      className={cn(inputBase, errors.name ? "border-destructive" : "border-border focus:border-primary")}
                    />
                  </Field>
                  <Field label={t.phone} error={errors.phone}>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={t.phonePh}
                      className={cn(inputBase, errors.phone ? "border-destructive" : "border-border focus:border-primary")}
                    />
                  </Field>
                </div>
                <Field label={t.email} error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t.emailPh}
                    className={cn(inputBase, errors.email ? "border-destructive" : "border-border focus:border-primary")}
                  />
                </Field>
                <Field label={t.course}>
                  <select
                    name="course"
                    defaultValue={presetCourse}
                    className={cn(inputBase, "border-border focus:border-primary")}
                  >
                    <option value="">{t.coursePh}</option>
                    {courseOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {presetTeacher && <input type="hidden" name="teacher" value={presetTeacher} />}
                </Field>
                <Field label={t.message}>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t.messagePh}
                    className={cn(inputBase, "resize-none border-border focus:border-primary")}
                  />
                </Field>
                <Field label={t.promo}>
                  <input
                    name="promo"
                    placeholder={t.promoPh}
                    className={cn(inputBase, "border-border focus:border-primary")}
                  />
                </Field>

                {/* RODO consent */}
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {t.consent}
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-xs font-medium text-destructive">{errors.consent}</span>
                )}

                {status === "error" && (
                  <p className="text-sm font-medium text-destructive">{t.errorText}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={buttonClasses({ size: "lg", className: "mt-1 w-full" })}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> {t.sending}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" /> {t.submit}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}
