import { cn } from "@/lib/utils";

/** Decorative animated gradient blobs. Pure CSS animation (no JS). */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="animate-aurora absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary/30 blur-3xl" />
      <div className="animate-float absolute -right-20 top-0 h-[26rem] w-[26rem] rounded-full bg-secondary/25 blur-3xl" />
      <div
        className="animate-aurora absolute bottom-[-8rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
