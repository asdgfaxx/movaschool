"use client";

import { useState } from "react";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FillBlankExercise {
  /** Text with ___ marking the blank position. */
  template: string;
  /** The correct word(s) for the blank. */
  answer: string;
  /** Hint shown before checking. */
  hint?: string;
  /** Explanation shown after checking. */
  explanation: string;
}

export function FillBlankQuiz({
  exercises,
  checkLabel,
  correctLabel,
  wrongLabel,
  resetLabel,
  explanationLabel,
}: {
  exercises: FillBlankExercise[];
  checkLabel: string;
  correctLabel: string;
  wrongLabel: string;
  resetLabel: string;
  explanationLabel: string;
}) {
  const [inputs, setInputs] = useState<string[]>(exercises.map(() => ""));
  const [results, setResults] = useState<(boolean | null)[]>(exercises.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const allFilled = inputs.every((i) => i.trim() !== "");

  function check() {
    const newResults = exercises.map((ex, i) => {
      const userAns = inputs[i].trim().toLowerCase();
      const correctAns = ex.answer.toLowerCase();
      return userAns === correctAns;
    });
    setResults(newResults);
    setSubmitted(true);
  }

  function reset() {
    setInputs(exercises.map(() => ""));
    setResults(exercises.map(() => null));
    setSubmitted(false);
  }

  const correctCount = results.filter((r) => r === true).length;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-6">
        {exercises.map((ex, i) => {
          const parts = ex.template.split("___");
          const isCorrect = results[i] === true;
          const isWrong = results[i] === false;
          return (
            <div key={i} className="flex flex-col gap-2">
              <p className="text-sm font-semibold">
                <span className="text-primary">{i + 1}.</span>
              </p>
              <div className="flex flex-wrap items-baseline gap-1 text-base leading-relaxed">
                <span>{parts[0]}</span>
                <input
                  type="text"
                  value={inputs[i]}
                  onChange={(e) => {
                    const next = [...inputs];
                    next[i] = e.target.value;
                    setInputs(next);
                  }}
                  disabled={submitted}
                  placeholder="..."
                  className={cn(
                    "inline-block w-28 rounded-lg border px-2 py-1 text-center text-sm font-bold outline-none transition-colors",
                    !submitted && "border-border focus:border-primary",
                    isCorrect && "border-accent bg-accent/10 text-accent",
                    isWrong && "border-destructive bg-destructive/5 text-destructive",
                    submitted && !isCorrect && !isWrong && "border-border",
                  )}
                />
                {parts[1] && <span>{parts[1]}</span>}
                {submitted && isCorrect && <Check className="h-4 w-4 text-accent" />}
                {submitted && isWrong && <X className="h-4 w-4 text-destructive" />}
              </div>
              {ex.hint && !submitted && (
                <p className="text-xs italic text-muted-foreground/70">{ex.hint}</p>
              )}
              {submitted && (
                <div className="rounded-lg bg-surface-muted p-3">
                  <p className="text-xs font-semibold text-muted-foreground">{explanationLabel}:</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ex.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={check}
            disabled={!allFilled}
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,var(--primary),var(--secondary))] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-clay disabled:opacity-50 disabled:pointer-events-none"
          >
            {checkLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <>
            <span
              className={cn(
                "inline-flex h-8 items-center rounded-full px-3 text-sm font-bold",
                correctCount === exercises.length ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary",
              )}
            >
              {correctCount}/{exercises.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {correctCount === exercises.length ? correctLabel : wrongLabel}
            </span>
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
