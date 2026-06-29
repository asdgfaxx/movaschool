"use client";

import { useState } from "react";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/messages/types";

type Exercise = Dictionary["pages"]["b1"]["demoExercises"][number];

export function B1DemoQuiz({
  exercises,
  title,
  subtitle,
  checkLabel,
  correctLabel,
  resetLabel,
}: {
  exercises: Exercise[];
  title: string;
  subtitle: string;
  checkLabel: string;
  correctLabel: string;
  resetLabel: string;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(exercises.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const correctCount = answers.filter((a, i) => a === exercises[i].answer).length;
  const allAnswered = answers.every((a) => a !== null);

  function select(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function reset() {
    setAnswers(exercises.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>

      {/* Questions */}
      <div className="mt-6 flex flex-col gap-6">
        {exercises.map((ex, qi) => (
          <div key={qi} className="flex flex-col gap-3">
            <p className="text-sm font-semibold">
              <span className="text-primary">{qi + 1}.</span> {ex.question}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {ex.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi;
                const isCorrect = oi === ex.answer;
                const showCorrect = submitted && isCorrect;
                const showWrong = submitted && isSelected && !isCorrect;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => select(qi, oi)}
                    disabled={submitted}
                    className={cn(
                      "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-sm transition-all",
                      !submitted && isSelected && "border-primary bg-primary/5 text-primary",
                      !submitted && !isSelected && "border-border bg-surface text-muted-foreground hover:border-primary/40",
                      showCorrect && "border-accent bg-accent/10 text-accent",
                      showWrong && "border-destructive bg-destructive/5 text-destructive",
                      submitted && !isCorrect && !isSelected && "border-border bg-surface text-muted-foreground opacity-60",
                    )}
                  >
                    {showCorrect && <Check className="h-4 w-4 shrink-0" />}
                    {showWrong && <X className="h-4 w-4 shrink-0" />}
                    {opt}
                  </button>
                );
              })}
            </div>
            {submitted && (
              <div className="rounded-lg bg-surface-muted p-3 text-xs leading-relaxed text-muted-foreground">
                {ex.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,var(--primary),var(--secondary))] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-clay disabled:opacity-50 disabled:pointer-events-none"
          >
            {checkLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm font-bold">
              <span className={cn("inline-flex h-8 items-center rounded-full px-3", correctCount === exercises.length ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary")}>
                {correctCount}/{exercises.length}
              </span>
              <span className="text-muted-foreground">
                {correctLabel}
              </span>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {resetLabel}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
