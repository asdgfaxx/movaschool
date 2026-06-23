import Image from "next/image";
import type { Teacher } from "@/messages/types";

export function TeacherCard({ t }: { t: Teacher }) {
  return (
    <div className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-surface p-6 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))] opacity-0 blur transition-opacity duration-300 group-hover:opacity-70" />
        <Image
          src={t.photo}
          alt={t.name}
          width={120}
          height={120}
          className="relative h-24 w-24 rounded-full object-cover ring-4 ring-surface sm:h-28 sm:w-28"
        />
      </div>
      <div>
        <h3 className="font-bold">{t.name}</h3>
        <p className="text-xs text-muted-foreground">{t.role}</p>
        <p className="mt-2 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {t.experience}
        </p>
      </div>
    </div>
  );
}
