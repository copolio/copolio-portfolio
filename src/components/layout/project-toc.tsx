"use client";

import { useActiveSection } from "@/hooks/use-active-section";
import type { TocHeading } from "@/lib/markdown-utils";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ProjectTocProps {
  headings: TocHeading[];
}

export function ProjectToc({ headings }: ProjectTocProps) {
  const sectionIds = useMemo(
    () => headings.map((h) => h.id),
    [headings]
  );
  const activeSection = useActiveSection(sectionIds);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 max-w-56">
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block text-sm px-3 py-1 rounded-md transition-colors border-l-2 truncate",
                h.level === 3 && "pl-6 text-xs",
                activeSection === h.id
                  ? "border-primary text-foreground font-medium bg-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
              )}
              title={h.text}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
