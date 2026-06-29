"use client";

import { useState, useCallback } from "react";
import { Check, X, RotateCcw, ArrowRight, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WordOrderExercise {
  /** The correct sentence — split into words to create shuffled tokens. */
  sentence: string;
  /** Translation/meaning shown as hint. */
  translation: string;
  explanation: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function WordOrderQuiz({
  exercises,
  checkLabel,
  correctLabel,
  wrongLabel,
  resetLabel,
  explanationLabel,
}: {
  exercises: WordOrderExercise[];
  checkLabel: string;
  correctLabel: string;
  wrongLabel: string;
  resetLabel: string;
  explanationLabel: string;
}) {
  const [pools, setPools] = useState<string[][]>(() =>
    exercises.map((ex) => shuffle(ex.sentence.split(" "))),
  );
  const [selected, setSelected] = useState<string[][]>(() =>
    exercises.map(() => []),
  );
  const [results, setResults] = useState<(boolean | null)[]>(exercises.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const moveToSelected = useCallback((qIndex: number, word: string, wordIndex: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const next = [...prev];
      next[qIndex] = [...next[qIndex], word];
      return next;
    });
    setPools((prev) => {
      const next = [...prev];
      next[qIndex] = next[qIndex].filter((_, i) => i !== wordIndex);
      return next;
    });
  }, [submitted]);

  const moveToPool = useCallback((qIndex: number, wordIndex: number) => {
    if (submitted) return;
    setSelected((prev) => {
      const word = prev[qIndex][wordIndex];
      const next = [...prev];
      next[qIndex] = next[qIndex].filter((_, i) => i !== wordIndex);
      setPools((p) => {
        const np = [...p];
        np[qIndex] = [...np[qIndex], word];
        return np;
      });
      return next;
    });
  }, [submitted]);

  function check() {
    const newResults = exercises.map((ex, i) => {
      const userSentence = selected[i].join(" ");
      return userSentence === ex.sentence;
    });
    setResults(newResults);
    setSubmitted(true);
  }

  function reset() {
    setPools(exercises.map((ex) => shuffle(ex.sentence.split(" "))));
    setSelected(exercises.map(() => []));
    setResults(exercises.map(() => null));
    setSubmitted(false);
  }

  const correctCount = results.filter((r) => r === true).length;
  const allWordsPlaced = selected.every((s) => s.length > 0) && pools.every((p) => p.length === 0);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8">
      <div className="flex flex-col gap-6">
        {exercises.map((ex, qi) => {
          const isCorrect = results[qi] === true;
          const isWrong = results[qi] === false;
          return (
            <div key={qi} className="flex flex-col gap-3">
              {/* Translation hint */}
              <p className="text-sm font-semibold text-muted-foreground">
                <span className="text-primary">{qi + 1}.</span> {ex.translation}
              </p>

              {/* Selected words area (answer zone) */}
              <div
                className={cn(
                  "flex min-h-[3rem] flex-wrap items-center gap-2 rounded-xl border-2 border-dashed p-3 transition-colors",
                  submitted && isCorrect && "border-accent/40 bg-accent/5",
                  submitted && isWrong && "border-destructive/40 bg-destructive/5",
                  !submitted && "border-border bg-surface-muted",
                )}
              >
                {selected[qi].length === 0 && (
                  <span className="text-xs text-muted-foreground/50">···</span>
                )}
                {selected[qi].map((word, wi) => (
                  <button
                    key={`${word}-${wi}`}
                    type="button"
                    onClick={() => moveToPool(qi, wi)}
                    disabled={submitted}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-sm font-semibold shadow-sm transition-all",
                      !submitted && "bg-primary text-primary-foreground hover:opacity-80 active:scale-95",
                      submitted && isCorrect && "bg-accent text-accent-foreground",
                      submitted && isWrong && "bg-destructive text-destructive-foreground",
                    )}
                  >
                    {word}
                  </button>
                ))}
              </div>

              {/* Word pool */}
              {!submitted && pools[qi].length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {pools[qi].map((word, wi) => (
                    <button
                      key={`${word}-${wi}`}
                      type="button"
                      onClick={() => moveToSelected(qi, word, wi)}
                      className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-semibold shadow-sm transition-all hover:border-primary hover:text-primary active:scale-95"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              )}

              {/* Result + explanation */}
              {submitted && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <Check className="h-4 w-4 text-accent" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    <span className={cn("text-sm font-bold", isCorrect ? "text-accent" : "text-destructive")}>
                      {isCorrect ? correctLabel : wrongLabel}
                    </span>
                    {!isCorrect && (
                      <span className="text-sm text-muted-foreground">
                        → {ex.sentence}
                      </span>
                    )}
                  </div>
                  <div className="rounded-lg bg-surface-muted p-3">
                    <p className="text-xs font-semibold text-muted-foreground">{explanationLabel}:</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{ex.explanation}</p>
                  </div>
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
            disabled={!allWordsPlaced}
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
