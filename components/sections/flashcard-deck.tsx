"use client";

import { useState, useCallback } from "react";
import { RotateCw, ArrowRight, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Flashcard {
  front: string;
  back: string;
  example?: string;
}

export function FlashcardDeck({
  cards,
  nextLabel,
  flipLabel,
}: {
  cards: Flashcard[];
  nextLabel: string;
  flipLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const card = cards[index];
  const isLast = index === cards.length - 1;

  const flip = useCallback(() => setFlipped((f) => !f), []);

  const next = useCallback(() => {
    setKnownCount((c) => c + 1);
    if (isLast) {
      setIndex(0);
      setFlipped(false);
      setKnownCount(0);
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }, [isLast]);

  function skip() {
    if (isLast) {
      setIndex(0);
      setFlipped(false);
    } else {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {cards.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-primary" : i < index ? "w-2 bg-accent" : "w-2 bg-border",
            )}
          />
        ))}
      </div>

      {/* Flashcard */}
      <div
        role="button"
        tabIndex={0}
        onClick={flip}
        onKeyDown={handleKey}
        aria-label={flipLabel}
        className="group relative h-64 w-full max-w-md cursor-pointer [perspective:1200px]"
      >
        <div
          className={cn(
            "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-surface p-8 shadow-soft [backface-visibility:hidden]">
            <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              <RotateCw className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-primary">
              {index + 1} / {cards.length}
            </span>
            <p className="text-center text-2xl font-extrabold text-balance">{card.front}</p>
            <span className="mt-2 text-xs text-muted-foreground">{flipLabel}</span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-8 shadow-clay [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-center text-2xl font-extrabold text-primary text-balance">{card.back}</p>
            {card.example && (
              <p className="mt-2 max-w-xs text-center text-sm italic leading-relaxed text-muted-foreground">
                &ldquo;{card.example}&rdquo;
              </p>
            )}
            {card.example && (
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Volume2 className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={skip}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          {nextLabel}
        </button>
        <button
          type="button"
          onClick={next}
          className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,var(--primary),var(--secondary))] px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-clay"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
