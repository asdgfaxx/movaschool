"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

export function ShareButtons({
  url,
  title,
  shareLabel,
  copyLinkLabel,
  copiedLabel,
}: {
  url: string;
  title: string;
  shareLabel: string;
  copyLinkLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text
    }
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{shareLabel}</span>
      <div className="flex items-center gap-2">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X / Twitter"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Share2 className="h-4 w-4" />
          X
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Share2 className="h-4 w-4" />
          LinkedIn
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-label={copyLinkLabel}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {copied ? <Check className="h-4 w-4 text-accent" /> : <Link2 className="h-4 w-4" />}
        </button>
        {copied && (
          <span className="text-xs font-semibold text-accent">{copiedLabel}</span>
        )}
      </div>
    </div>
  );
}
