import { cn } from "@/lib/utils";

export function BlogCover({
  from,
  to,
  className,
  children,
}: {
  from: string;
  to: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,.6) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />
      <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/20 blur-2xl" aria-hidden />
      <div className="absolute -bottom-12 -left-6 h-40 w-40 rounded-full bg-black/10 blur-2xl" aria-hidden />
      {children}
    </div>
  );
}
