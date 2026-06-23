"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, GraduationCap, RotateCcw, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import type { Dictionary } from "@/messages/types";

type Phase = "intro" | "quiz" | "result";

export function LevelQuiz({
  data,
  locale,
}: {
  data: Dictionary["pages"]["levelTest"];
  locale: string;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const total = data.questions.length;
  const q = data.questions[index];

  const result = useMemo(
    () => [...data.results].reverse().find((r) => score >= r.min) ?? data.results[0],
    [data.results, score],
  );

  function next() {
    if (selected === null) return;
    const newScore = score + (q.options[selected].correct ? 1 : 0);
    setScore(newScore);
    if (index + 1 < total) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      setPhase("result");
    }
  }

  function restart() {
    setPhase("intro");
    setIndex(0);
    setSelected(null);
    setScore(0);
  }

  return (
    <Container className="max-w-2xl pb-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-6 shadow-clay sm:p-10">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex flex-col items-center gap-5 text-center"
            >
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-8 w-8" />
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
              className="flex flex-col gap-6"
            >
              <div>
                <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>
                    {data.question} {index + 1} {data.of} {total}
                  </span>
                  <span>{q.hint}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <motion.div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary),var(--secondary))]"
                    initial={false}
                    animate={{ width: `${((index + 1) / total) * 100}%` }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                </div>
              </div>

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
              className="flex flex-col items-center gap-5 text-center"
            >
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,var(--primary),var(--secondary))] text-2xl font-extrabold text-primary-foreground shadow-clay">
                {result.code}
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{data.resultLead}</p>
                <h2 className="text-3xl font-extrabold">{result.title}</h2>
              </div>
              <p className="max-w-md text-muted-foreground">{result.text}</p>
              <div className="w-full rounded-2xl border border-border bg-surface-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {data.recommendLabel}
                </p>
                <p className="mt-1 font-bold text-primary">{result.recommend}</p>
              </div>
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
