"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, GraduationCap, RotateCcw, Sparkles, Headphones, Share2, Check, Send } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { Dictionary } from "@/messages/types";

type Phase = "intro" | "quiz" | "result";

export function LevelQuiz({
  data,
  locale,
  dict,
}: {
  data: Dictionary["pages"]["levelTest"];
  locale: string;
  dict: Dictionary;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [copied, setCopied] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = data.questions.length;
  const q = data.questions[index];
  const progress = phase === "quiz" ? ((index + 1) / total) * 100 : 0;

  const result = useMemo(
    () => [...data.results].reverse().find((r) => score >= r.min) ?? data.results[0],
    [data.results, score],
  );

  // Timer
  useEffect(() => {
    if (phase === "quiz") {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  function next() {
    if (selected === null) return;
    const newScore = score + (q.options[selected].correct ? 1 : 0);
    setScore(newScore);
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase("result");
    }
  }

  function restart() {
    setPhase("intro");
    setIndex(0);
    setSelected(null);
    setScore(0);
    setElapsed(0);
    setLeadSent(false);
  }

  function formatTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, "0")}`;
  }

  async function share() {
    const text = `${data.resultLead} ${result.code} — MOVASchool`;
    try {
      if (navigator.share) {
        await navigator.share({ title: data.title, text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  }

  async function onLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data2 = new FormData(form);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data2),
          type: "level-test",
          result: result.code,
          score: `${score}/${total}`,
        }),
      });
      setLeadSent(true);
      form.reset();
    } catch {}
  }

  return (
    <Container className="max-w-2xl pb-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-border glass-strong p-6 shadow-glow sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden />

        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex flex-col items-center gap-5 text-center"
            >
              <ProgressRing value={0} size={96} label={data.title} className="text-primary" />
              <span className="-mt-16 inline-flex h-16 w-16 items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </span>
              <h2 className="text-2xl font-extrabold">{data.title}</h2>
              <p className="max-w-md text-muted-foreground">{data.subtitle}</p>
              <button onClick={() => setPhase("quiz")} className={buttonClasses({ size: "lg" })}>
                {data.start}
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          {phase === "quiz" && (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex flex-col gap-6"
            >
              {/* Top: ProgressRing + Timer */}
              <div className="flex items-center justify-between">
                <ProgressRing value={progress} size={64} label={`${index + 1}/${total}`} />
                <div className="flex items-center gap-2">
                  {/* Audio placeholder */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground" title={data.audioSoon}>
                    <Headphones className="h-3.5 w-3.5" />
                    {data.audioLabel}
                    <span className="rounded-full bg-muted-foreground/10 px-1.5 text-[10px]">{data.audioSoon}</span>
                  </span>
                  {/* Timer */}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                    {data.timerLabel}: {formatTime(elapsed)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--secondary))]"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </div>

              <div className="text-xs font-semibold text-muted-foreground">{q.hint}</div>

              <p className="text-xl font-bold leading-relaxed">
                {q.prompt.split("___").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="mx-1 inline-block min-w-14 border-b-2 border-dashed border-primary align-middle">
                        &nbsp;
                      </span>
                    )}
                  </span>
                ))}
              </p>

              <div className="flex flex-col gap-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition-all",
                      selected === i
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background hover:border-primary/50",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs",
                        selected === i ? "border-primary bg-primary text-primary-foreground" : "border-border",
                      )}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                disabled={selected === null}
                className={buttonClasses({ size: "lg", className: "w-full" })}
              >
                {index + 1 < total ? data.next : data.finish}
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative flex flex-col items-center gap-5 text-center"
            >
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-2xl font-extrabold text-primary-foreground shadow-clay">
                {result.code}
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{data.resultLead}</p>
                <h2 className="text-3xl font-extrabold">{result.title}</h2>
              </div>
              <p className="max-w-md text-muted-foreground">{result.text}</p>

              {/* Recommended course cards */}
              {result.recommendedCourses && result.recommendedCourses.length > 0 && (
                <div className="grid w-full gap-3 sm:grid-cols-2">
                  {result.recommendedCourses.map((courseId) => {
                    const course = dict.pages.courses.groups
                      .flatMap((g) => g.courses)
                      .find((c) => c.id === courseId);
                    if (!course) return null;
                    return (
                      <SpotlightCard key={courseId} className="rounded-2xl border border-border bg-surface-muted p-4 text-left">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {course.level}
                        </span>
                        <p className="mt-2 font-bold">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.price}</p>
                        <Link
                          href={`/${locale}/contact?course=${courseId}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {dict.pages.courses.cta}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </SpotlightCard>
                    );
                  })}
                </div>
              )}

              {/* Share */}
              <button
                onClick={share}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {copied ? data.shareCopied : data.shareLabel}
              </button>

              {/* Lead capture */}
              {!leadSent ? (
                <form onSubmit={onLeadSubmit} className="w-full rounded-2xl border border-border bg-surface-muted p-5 text-left">
                  <p className="font-bold">{data.leadTitle}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{data.leadText}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input
                      name="name"
                      placeholder={data.leadName}
                      required
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                    <input
                      name="email"
                      type="email"
                      placeholder={data.leadEmail}
                      required
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <button type="submit" className={buttonClasses({ size: "md", className: "mt-3 w-full" })}>
                    <Send className="h-4 w-4" />
                    {data.leadSubmit}
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent">
                  <Check className="h-4 w-4" />
                  {data.leadSuccess}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/courses`} className={buttonClasses({ size: "lg" })}>
                  <GraduationCap className="h-5 w-5" />
                  {data.goCourses}
                </Link>
                <button onClick={restart} className={buttonClasses({ variant: "outline", size: "lg" })}>
                  <RotateCcw className="h-5 w-5" />
                  {data.restart}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
}
