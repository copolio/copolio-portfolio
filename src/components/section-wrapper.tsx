import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-16 px-4 md:px-8 lg:px-16", className)}
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </section>
  );
}
