"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  title,
  placeholder,
  submit,
  success,
  invalidEmail,
  className,
}: {
  title: string;
  placeholder: string;
  submit: string;
  success: string;
  invalidEmail: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-2", className)} noValidate>
      <label className="text-sm font-bold text-foreground" htmlFor="newsletter-email">
        {title}
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder={placeholder}
            required
            aria-invalid={status === "error"}
            className="h-10 w-full rounded-full border border-border bg-surface/60 pl-9 pr-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          />
        </div>
        <Button type="submit" size="sm" loading={status === "loading"}>
          {submit}
        </Button>
      </div>
      {status === "success" && (
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
          <Check className="h-3.5 w-3.5" /> {success}
        </p>
      )}
      {status === "error" && (
        <p className="text-xs font-semibold text-destructive">{invalidEmail}</p>
      )}
    </form>
  );
}
