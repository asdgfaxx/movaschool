import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ locale, className }: { locale: string; className?: string }) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="MOVASchool"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span className="grid grid-cols-2 gap-[3px] transition-transform duration-300 group-hover:rotate-12">
        <span className="h-2.5 w-2.5 rounded-full bg-[#b4e61e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#7c5cff]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="bg-[linear-gradient(110deg,#ef4444,#f97316)] bg-clip-text text-transparent">
          MOVAS
        </span>
        <span className="text-foreground">chool</span>
      </span>
    </Link>
  );
}
