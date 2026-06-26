import { cn } from "@/lib/utils";

export type ContainerWidth = "narrow" | "default" | "wide" | "full";

const widths: Record<ContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

export function Container({
  className,
  children,
  width = "default",
}: {
  className?: string;
  children: React.ReactNode;
  width?: ContainerWidth;
}) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", widths[width], className)}>
      {children}
    </div>
  );
}
